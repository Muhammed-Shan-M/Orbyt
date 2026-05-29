import type { InternalAxiosRequestConfig } from 'axios';


export interface ApiErrorResponse {
    success: false;
    message: string;
    code?: string;
}


export interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;

}


export interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}