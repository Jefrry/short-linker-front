import { useQuery } from '@tanstack/react-query';

import { linkApi } from '../api';

export const useLink = (id: string) => {
  const {
    data: link,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['link', id],
    queryFn: () => linkApi.getLink(id),
    enabled: !!id,
    staleTime: Infinity,
  });

  return { link, isLoading, isError };
};
