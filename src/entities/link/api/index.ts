import { baseApi, isArrayOf, isType, Link } from '@/shared';

import { isLink, isLinkMetrics } from '../lib/typeGuards';
import { LinkMetrics } from '../model/types';

export const linkApi = {
  createLink: async (url: string): Promise<Link> => {
    const response = await baseApi({
      path: 'shorten',
      method: 'POST',
      body: { url },
    });
    return isType(response, isLink, 'Invalid link data from createLink');
  },
  getLink: async (id: string): Promise<Link> => {
    const response = await baseApi({
      path: `link/${id}`,
      method: 'GET',
    });
    return isType(response, isLink, `Invalid link data from getLink(${id})`);
  },
  getLinkMetrics: async (id: string, from: number, to: number): Promise<LinkMetrics[]> => {
    const response = await baseApi({
      path: `shorten/${id}?from=${from}&to=${to}`,
      method: 'GET',
    });
    return isType(
      response,
      (data): data is LinkMetrics[] => isArrayOf(data, isLinkMetrics),
      `Invalid link metrics data from getLinkMetrics(${id})`,
    );
  },
};
