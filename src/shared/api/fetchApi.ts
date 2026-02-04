import { clientInterceptor } from './clientInterceptor';

type FetchApiProps = {
  url: string;
  method?: string;
  body?: Record<string, any>;
  headers?: Headers;
  signal?: AbortSignal;
};

export async function fetchApi<T extends Record<string, any>>({
  url,
  method = 'GET',
  body = {},
  headers,
  signal,
}: FetchApiProps): Promise<T> {
  const reqHeaders = new Headers();
  let reqBody;

  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    reqHeaders.append('Content-Type', 'application/json');
    reqBody = JSON.stringify(body);
  }

  if (headers) {
    headers.forEach((value, key) => {
      reqHeaders.append(key, value);
    });
  }

  const response = await fetch(url, {
    credentials: 'include',
    method,
    headers: reqHeaders,
    body: reqBody,
    signal,
  });

  // Auth guard
  clientInterceptor(response);

  if (!response.ok) {
    const errorResponse = await response.json();

    if (errorResponse?.errors) {
      throw errorResponse.errors;
    }
  }

  let data = null;

  if (response.status !== 204) {
    data = await response.json();
  }

  return data;
}
