import { fetchApi } from './fetchApi';

export type BaseApiProps = {
  path: string;
  method?: string;
  body?: Record<string, any>;
  cookies?: Record<string, any>;
  signal?: AbortSignal;
  isImage?: boolean;
};

export function baseApi<T extends Record<string, any>>({
  path,
  method = 'GET',
  body = {},
  cookies,
  signal,
}: BaseApiProps) {
  const headers = new Headers();

  if (cookies) {
    headers.set(
      'Cookie',
      Object.entries(cookies)
        .map(([key, value]) => `${key}=${value};path=/`)
        .join('; '),
    );
  }

  return fetchApi<T>({
    url: `${window.location.origin}/api/${path}`,
    method,
    body,
    headers,
    signal,
  });
}
