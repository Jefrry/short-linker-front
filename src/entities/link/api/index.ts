import { baseApi } from '@/shared';

export const linkApi = {
  createLink: async (url: string): Promise<{result: string}> => {
    return await baseApi({
      path: 'shorten',
      method: 'POST',
      body: { url },
    });
  },
};
