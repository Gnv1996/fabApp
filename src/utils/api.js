import axios from 'axios';

const api = axios.create({
  baseURL: 'http://95.217.73.49:8070/user/api/v1',
});

//For request
api.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  },
);

// For response
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default api;
