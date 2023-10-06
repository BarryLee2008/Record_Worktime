import axios from 'axios';

const request = axios.create({
  baseURL: '/',
});

request.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
