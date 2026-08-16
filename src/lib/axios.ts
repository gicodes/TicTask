import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { PUBLIC_ENDPOINTS } from "@/constants/footerLinks";
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

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];
let cachedSession: any = null;
let cacheExpiry = 0;

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token as string);
    }
  });

  failedQueue = [];
};

/* -----------------------------------------------------
  REQUEST INTERCEPTOR: Attach NextAuth accessToken
----------------------------------------------------- */
async function getCachedSession() {
  const now = Date.now();
  if (cachedSession && now < cacheExpiry) return cachedSession;

  const session = await getSession();
  cachedSession = session;
  cacheExpiry = now + 30_000;
  return session;
}

api.interceptors.request.use(async (config) => {
  const url = config.url ?? "";

  const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
    url.includes(endpoint)
  );
  
  if (isPublicEndpoint) return config;

  const session = await getCachedSession();

  if (session?.error === "RefreshAccessTokenError") {
    cachedSession = null;
    cacheExpiry = 0;

    return Promise.reject(
      new Error("Session expired – please log in again")
    );
  }

  if (session?.accessToken) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  return config;
});

/* -----------------------------------------------------
  RESPONSE INTERCEPTOR: Refresh on 401 + retry request
----------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    const url = original.url ?? "";
    if (PUBLIC_ENDPOINTS.some(ep => url.includes(ep))) {
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
      const newSession = await getSession();

      if (newSession?.accessToken && !newSession.error) {
        processQueue(null, newSession.accessToken);
        original.headers["Authorization"] = `Bearer ${newSession.accessToken}`;
        return api(original);
      }

      processQueue(new Error("Unable to refresh session"), null);
      const { signOut } = await import("next-auth/react");
      await signOut({ callbackUrl: "/auth/login", redirect: true});

      return Promise.reject(new Error("Session expired – please log in again"));
    } catch (refreshError) {
      processQueue(refreshError, null);

      const { signOut } = await import("next-auth/react");
      await signOut({ callbackUrl: "/auth/login" });

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
