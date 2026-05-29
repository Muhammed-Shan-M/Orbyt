import '@tanstack/react-query';

declare module '@tanstack/react-query' {

    interface Register {

        mutationMeta: {
            showGlobalError?: boolean;
            showSuccessToast?: boolean;
            suppressGlobalError?: boolean;
        };

    }

}