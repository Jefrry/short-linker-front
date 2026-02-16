import { useQuery } from '@tanstack/react-query';

import { userApi } from '../api';

export const useUserLinks = () =>
  useQuery({
    queryKey: ['user-links'],
    queryFn: userApi.getUserLinks,
  });
