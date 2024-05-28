import Axios, { InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }
  return config;
}

export const apiClient = Axios.create({
  baseURL: env.BASE_API_URL,
});

apiClient.interceptors.request.use(authRequestInterceptor);
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const message = error.response?.data?.message || error.message;

    return Promise.reject(error);
  },
);
