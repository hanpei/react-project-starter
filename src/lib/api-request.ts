import { env } from '@/config/env';
import Axios from 'axios';
import { toast } from 'sonner';
import { getLocalStorage } from './storage';

export const api = Axios.create({
  baseURL: env.API_URL,
});

/**
 * Request Interceptors
 * 设置请求头config
 */
api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  const token = getLocalStorage('token');
  config.headers.token = token;
  return config;
});

/**
 * Response Interceptors
 * 处理响应
 */
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get('redirectTo');
      window.location.href = `/login?redirectTo=${redirectTo}`;
    }

    return Promise.reject(error);
  }
);
