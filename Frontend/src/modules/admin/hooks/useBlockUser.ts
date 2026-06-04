import { useMutation, useQueryClient } from '@tanstack/react-query';

import { blockUser } from '../api/blockUser';

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blockUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-users'],
      });
    },
  });
};