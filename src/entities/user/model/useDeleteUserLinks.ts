import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Link } from '@/shared';

import { userApi } from '../api';

export const useDeleteUserLinks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteUserLinks,
    onMutate: async (ids: string[]) => {
      await queryClient.cancelQueries({ queryKey: ['user-links'] });

      const previousLinks = queryClient.getQueryData<Link[]>(['user-links']);

      queryClient.setQueryData(['user-links'], (old: Link[] | undefined) => {
        if (!old) return [];
        return old.map((link) => (ids.includes(link.id) ? { ...link, deleted: true } : link));
      });

      return { previousLinks };
    },
    onError: (_err, _ids, context) => {
      if (context?.previousLinks) {
        queryClient.setQueryData(['user-links'], context.previousLinks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user-links'] });
    },
  });
};
