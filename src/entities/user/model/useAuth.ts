import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const signinMutation = useMutation({
    mutationFn: ([email, password]: Parameters<typeof userApi.signin>) => 
      userApi.signin(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const signupMutation = useMutation({
    mutationFn: ([email, password, name]: Parameters<typeof userApi.signup>) => 
      userApi.signup(email, password, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const signoutMutation = useMutation({
    mutationFn: userApi.signout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    signin: signinMutation,
    signup: signupMutation,
    signout: signoutMutation,
  };
};
