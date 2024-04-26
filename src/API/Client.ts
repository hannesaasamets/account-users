import type { QueryParams } from '@/App.vue';

function buildUrlWithParams(url: string, params?: QueryParams): string {
  if (!params) {
    return url;
  }

  const queryParams = new URLSearchParams(params as unknown as Record<string, string>).toString();

  return `${url}?${queryParams}`;
}

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export async function fetchGetJson<T>(url: string, params?: QueryParams) {
  return fetchJson<T>(buildUrlWithParams(url, params));
}
