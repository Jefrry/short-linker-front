import { queryClient } from '@/app/providers/QueryProvider';

export function clientInterceptor(response: Response) {
  const isUnauthorized = response.status === 401;
  const isServer = typeof window === 'undefined';
  
  if (isUnauthorized && !isServer) {
    queryClient.setQueryData(['user'], null);
    
    // Only redirect if we are NOT already on the home page
    if (window.location.pathname !== '/') {
      window.location.replace('/');
    }
    
    throw new Error('Unauthorized');
  }
}
