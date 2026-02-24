import { baseApi, Link } from '@/shared';

import { LinkMetrics } from '@/entities/link/model/types';

export const linkApi = {
  createLink: async (url: string): Promise<Link> =>
    await baseApi({
      path: 'shorten',
      method: 'POST',
      body: { url },
    }),
  getLinkMetrics: async (id: string, from: number, to: number): Promise<LinkMetrics[]> =>
    await baseApi({
      path: `shorten/${id}?from=${from}&to=${to}`,
      method: 'GET',
    }),
};
