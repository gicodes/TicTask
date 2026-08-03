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
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            original.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      // Force NextAuth to run the jwt callback (which does the real refresh)
      // The easiest reliable way:
      const sessionRes = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include",
      });
      const newSession = await sessionRes.json();

      if (newSession?.accessToken && !newSession.error) {
        processQueue(null, newSession.accessToken);
        original.headers["Authorization"] = `Bearer ${newSession.accessToken}`;
        return api(original);
      }

      // Permanent failure
      processQueue(new Error("Unable to refresh session"), null);
      // Optional: force logout
      // await signOut({ callbackUrl: "/auth/login" });
      return Promise.reject(error);
    } catch (refreshError) {
      processQueue(refreshError, null);
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
  headers: Record<string, string> = {},
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const isFormData = data instanceof FormData;

  const finalConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
      ...config?.headers,
    },
  };

  const res = await api.post(url, data, finalConfig);
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
