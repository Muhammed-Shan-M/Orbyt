import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {

    if (axios.isAxiosError(error)) {

        const message = error.response?.data?.message;

        if (typeof message === 'string' && message.trim()) {
            return message;
        }

        if (!error.response) {
            return 'Network error. Please check your connection.';
        }

        return 'Something went wrong.';
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'Something went wrong.';
};