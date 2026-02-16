import { useMutation, useQueryClient } from '@tanstack/react-query';

// Small antipatern, because one entity should not know about another
// but it is a small project and it is not a problem
import { useNotificationStore } from '@/entities/notification';

import { userApi } from '../api';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const signinMutation = useMutation({
    mutationFn: ([email, password]: Parameters<typeof userApi.signin>) =>
      userApi.signin(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      addNotification({
        type: 'success',
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Sign in failed',
        description: error instanceof Error ? error.message : 'Please check your credentials.',
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: ([email, password, name]: Parameters<typeof userApi.signup>) =>
      userApi.signup(email, password, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      addNotification({
        type: 'success',
        title: 'Account created!',
        description: 'Your account has been successfully created.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Sign up failed',
        description: error instanceof Error ? error.message : 'Could not create account.',
      });
    },
  });

  const signoutMutation = useMutation({
    mutationFn: userApi.signout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      addNotification({
        type: 'success',
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Sign out failed',
        description: error instanceof Error ? error.message : 'Something went wrong.',
      });
    },
  });

  return {
    signin: signinMutation,
    signup: signupMutation,
    signout: signoutMutation,
  };
};
