import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiGet<TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res: AxiosResponse<TResponse> = await api.get(url, config);
  return res.data;
}

export async function apiPost<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res: AxiosResponse<TResponse> = await api.post(url, data, config);
  return res.data;
}

export async function apiPut<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res: AxiosResponse<TResponse> = await api.put(url, data, config);
  return res.data;
}

export async function apiDelete<TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res: AxiosResponse<TResponse> = await api.delete(url, config);
  return res.data;
}

export default api;