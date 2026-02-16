import { useMutation } from '@tanstack/react-query';

import { linkApi } from '@/entities/link';

export const useCreateLink = () =>
  useMutation({
    mutationFn: async (url: string) => {
      if (!url) {
        throw new Error('URL is required');
      }

      try {
        new URL(url);
      } catch {
        throw new Error('Invalid URL');
      }

      const response = await linkApi.createLink(url);
      return response;
    },
  });
