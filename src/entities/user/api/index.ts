import { baseApi, Link } from '@/shared';

import { User } from '../model/types';

export const userApi = {
  getUser: async (): Promise<User> =>
    await baseApi({
      path: 'user/profile',
      method: 'GET',
    }),
  signin: async (email: string, password: string) =>
    await baseApi({
      path: 'user/signin',
      method: 'POST',
      body: { email, password },
    }),
  signup: async (email: string, password: string, name: string): Promise<User> =>
    await baseApi({
      path: 'user/signup',
      method: 'POST',
      body: { email, password, name },
    }),
  signout: async () =>
    await baseApi({
      path: 'user/signout',
      method: 'POST',
    }),
  getUserLinks: async (): Promise<Link[]> =>
    await baseApi({
      path: 'user/urls',
      method: 'GET',
    }),
  deleteUserLinks: async (ids: string[]) =>
    await baseApi({
      path: 'user/urls',
      method: 'DELETE',
      body: ids,
    }),
};
