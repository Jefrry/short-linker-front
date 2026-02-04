export function clientInterceptor(response: Response) {
  const isUnauthorized = response.status === 401;
  const isServer = typeof window === 'undefined';
  if (isUnauthorized && !isServer) {
    window.location.replace('/');
    throw new Error('Unauthorized');
  }
}
