import { baseApi, Link } from '@/shared';

export const linkApi = {
  createLink: async (url: string): Promise<Link> =>
    await baseApi({
      path: 'shorten',
      method: 'POST',
      body: { url },
    }),
};
