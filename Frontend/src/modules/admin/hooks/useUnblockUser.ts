import { useMutation } from '@tanstack/react-query';

import { unblockUser } from '../api/unblockUser';
import { useQueryClient } from '@tanstack/react-query';

export const useUnblockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unblockUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-users'],
      });
    },
  });
};