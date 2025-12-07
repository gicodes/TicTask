import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const NEXTAUTH_API_BASE_URL = process.env.API_URL || "http://localhost:4000/api";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const nextAuthApi: AxiosInstance = axios.create({
  baseURL: NEXTAUTH_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/* -----------------------------------------------------
  REQUEST INTERCEPTOR: Attach NextAuth accessToken
----------------------------------------------------- */
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;

  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

/* -----------------------------------------------------
  RESPONSE INTERCEPTOR: Refresh on 401 + retry request
----------------------------------------------------- */

let isRefreshing = false;
let queuedRequests: Array<(token: string) => void> = [];

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config;

    // If not 401 or already retried, reject
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // Queue request if we're already refreshing
    if (isRefreshing) {
      return new Promise((resolve) => {
        queuedRequests.push((newToken: string) => {
          original.headers["Authorization"] = `Bearer ${newToken}`;
          resolve(api(original));
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await nextAuthApi.post("/auth/refresh", {});

      if (refreshResponse.status === 200) {
        await fetch("/api/auth/session?update");

        const newSession = await getSession();
        const newToken = newSession?.accessToken;

        // Replay queued requests
        queuedRequests.forEach((cb) => cb(newToken!));
        queuedRequests = [];

        // Retry original request
        original.headers["Authorization"] = `Bearer ${newToken}`;
        return api(original);
      }
    } catch (refreshError) {
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

/* -------------------------------------------------------------------
  Axios to express API Helper Methods ft GET, POST, PATCH, PUT, DELETE
---------------------------------------------------------------------- */

export async function apiGet<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
  const res: AxiosResponse<TResponse> = await api.get(url, config);
  return res.data;
}

export async function apiPost<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  headers?: Record<string, string>,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res = await api.post(url, data, config ? { ...config, headers: { ...config.headers, ...headers } } : { headers });
  return res.data;
}

export async function apiPatch<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  headers?: Record<string, string>,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res = await api.patch(url, data, config ? { ...config, headers: { ...config.headers, ...headers } } : { headers });
  return res.data;
}

export async function nextAuthApiGet<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
  const res = await nextAuthApi.get(url, config);
  return res.data;
}

export async function nextAuthApiPost<TResponse, TBody = unknown>(url: string, data?: TBody, config?: AxiosRequestConfig) {
  const res = await nextAuthApi.post<TResponse>(url, data, {
    withCredentials: true,
    ...config,
  });
  return res.data;
}

export async function apiPut<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res = await api.put(url, data, config);
  return res.data;
}

export async function apiDelete<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
  const res = await api.delete(url, config);
  return res.data;
}

export default api;
