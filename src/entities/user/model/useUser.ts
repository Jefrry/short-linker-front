import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userApi.getUser,
    staleTime: Infinity,
    retry: false,
  });
};
