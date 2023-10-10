import axios from 'axios';

const request = axios.create({
  baseURL: '/',
});

//拦截器，每个request发出时加入token
request.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//拦截器，获取response时，在localStorage里存入token
request.interceptors.response.use(
  (config) => {
    const authToken = config.data.token;
    if (authToken) {
      const jwtToken = authToken.substring(7);
      localStorage.setItem("token", jwtToken);
      //getAuth({ token: jwtToken });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
