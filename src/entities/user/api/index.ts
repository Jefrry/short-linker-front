import { isLink } from '@/entities/link';

import { baseApi, isArrayOf, isType, Link } from '@/shared';

import { isUser } from '../lib/typeGuards';
import { User } from '../model/types';

export const userApi = {
  getUser: async (): Promise<User> => {
    const response = await baseApi({
      path: 'user/profile',
      method: 'GET',
    });
    return isType(response, isUser, 'Invalid user data from getUser');
  },
  signin: async (email: string, password: string) =>
    await baseApi({
      path: 'user/signin',
      method: 'POST',
      body: { email, password },
    }),
  signup: async (email: string, password: string, name: string): Promise<User> => {
    const response = await baseApi({
      path: 'user/signup',
      method: 'POST',
      body: { email, password, name },
    });
    return isType(response, isUser, 'Invalid user data from signup');
  },
  signout: async () =>
    await baseApi({
      path: 'user/signout',
      method: 'POST',
    }),
  getUserLinks: async (): Promise<Link[]> => {
    const response = await baseApi({
      path: 'user/urls',
      method: 'GET',
    });
    return isType(
      response,
      (data): data is Link[] => isArrayOf(data, isLink),
      'Invalid links data from getUserLinks',
    );
  },
  deleteUserLinks: async (ids: string[]) =>
    await baseApi({
      path: 'user/urls',
      method: 'DELETE',
      body: ids,
    }),
};
