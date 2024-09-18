import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Axios from 'axios';
import { toast } from 'sonner';
import { env } from '@/config/env';
import { CACHE_KEY } from '@/constants';
import { getLocalStorage, removeLocalStorage } from './storage';
import { mockApi } from './api-mocks';

export const api: AxiosInstance = Axios.create({
  baseURL: env.API_URL,
});

if (env.MOCK_API) {
  mockApi();
}

/**
 * Request Interceptors
 * 设置请求头config
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  const token = getLocalStorage('token');
  if (token && config.headers) {
    config.headers.token = token;
  }
  return config;
});

/**
 * Response Interceptors
 * 处理响应
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);

    if (error.response?.status === 401) {
      // 清除本地存储的token和用户信息
      removeLocalStorage(CACHE_KEY.TOKEN);
      removeLocalStorage(CACHE_KEY.USER);

      // 获取当前页面URL作为重定向目标
      const currentPath = encodeURIComponent(
        window.location.pathname + window.location.search
      );

      // 重定向到登录页面
      window.location.href = `/login?redirectTo=${currentPath}`;
    }

    return Promise.reject(error);
  }
);
