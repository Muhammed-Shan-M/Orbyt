import axios from 'axios';

import type { AxiosError } from 'axios';
import type { ApiErrorResponse, QueueItem, RetryAxiosRequestConfig } from '../../../shared/types/api.types';

import axiosInstance from '../axios';

import { store } from '../../store/store';

import { logout, setAccessToken } from '../../../modules/auth/store/auth.slice';

let isRefreshing = false;

let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token?: string) => {

    failedQueue.forEach(({ resolve, reject }) => {

        if (error) {
            reject(error);
        } else if (token) {
            resolve(token);
        }

    });

    failedQueue = [];
};

export const errorInterceptor = async (error: AxiosError<ApiErrorResponse>) => {

    const originalRequest = error.config as RetryAxiosRequestConfig;
    const errorCode = error.response?.data?.code;

    if (errorCode === 'ACCESS_TOKEN_EXPIRED' && !originalRequest._retry) {

        originalRequest._retry = true;

        if (isRefreshing) {

            return new Promise<string>(
                (resolve, reject) => {

                    failedQueue.push({
                        resolve,
                        reject,
                    });

                }).then((token) => {
                    originalRequest.headers?.set(
                        'Authorization',
                        `Bearer ${token}`
                    );

                    return axiosInstance(originalRequest);
                })
        }

        isRefreshing = true;

        try {

            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`, {},

                {
                    withCredentials: true,
                }

            );

            const newAccessToken = response.data.accessToken;


            store.dispatch(setAccessToken(newAccessToken));

            processQueue(null, newAccessToken);

            originalRequest.headers?.set(
                'Authorization',
                `Bearer ${newAccessToken}`
            );

            return axiosInstance(originalRequest);

        } catch (refreshError) {

            processQueue(refreshError);

            store.dispatch(logout());

            window.location.href = '/login';

            return Promise.reject(refreshError);

        } finally {
            isRefreshing = false;
        }

    }

    return Promise.reject(error);
};