import { baseApi, Link } from "@/shared";
import { User } from "../model/types";

export const userApi = {
  getUser: async (): Promise<User> => {
    return await baseApi({
      path: 'user/profile',
      method: 'GET',
    });
  },
  signin: async (email: string, password: string) => {
    return await baseApi({
      path: 'user/signin',
      method: 'POST',
      body: { email, password },
    });
  },
  signup: async (email: string, password: string, name: string): Promise<User> => {
    return await baseApi({
      path: 'user/signup',
      method: 'POST',
      body: { email, password, name },
    });
  },
  signout: async () => {
    return await baseApi({
      path: 'user/signout',
      method: 'POST',
    });
  },
  getUserLinks: async (): Promise<Link[]> => {
    return await baseApi({
      path: 'user/urls',
      method: 'GET',
    });
  },
};