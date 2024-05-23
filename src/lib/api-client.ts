import Axios, { InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

console.log(api);

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const message = error.response?.data?.message || error.message;

    return Promise.reject(error);
  },
);
