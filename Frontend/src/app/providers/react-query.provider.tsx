import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ReactNode } from "react";

import { toastManager } from "../utils/toast";

import { getErrorMessage } from "../utils/error-handler";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {

      onError: (error, _variables, _context, mutation) => {
        if (mutation.meta?.suppressGlobalError) {
          return;
        }

        toastManager.error(
          getErrorMessage(error)
        );

      },

    },

  },
});

interface Props {
  children: ReactNode;
}

export const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};