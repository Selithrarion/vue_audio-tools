import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081/',
});

export default boot(() => {
  http.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      console.log('INTERCEPTOR REQUEST', config);
      return config;
    },
    (error: AxiosError) => {
      console.error('INTERCEPTOR REQUEST ERROR', error);
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('RESPONSE DATA -', response?.data);
      return response;
    },
    async (error: AxiosError) => {
      console.error('RESPONSE error', error, error.response);
      return Promise.reject(error);
    }
  );
});

export { http };
