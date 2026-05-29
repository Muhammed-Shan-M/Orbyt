import type {
    InternalAxiosRequestConfig
} from 'axios';

import { store } from '../../store/store';

export const authInterceptor = (config: InternalAxiosRequestConfig) => {

    const token = store.getState().auth.accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};