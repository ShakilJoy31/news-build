import axios, { AxiosError, AxiosRequestConfig } from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;


const retryLimit = 1;

const retryInterceptor = async (error: AxiosError) => {
  const config = error.config as AxiosRequestConfig & { retryCount?: number };
  if (!config || config.retryCount! >= retryLimit) {
    return Promise.reject(error);
  }

  config.retryCount = (config.retryCount || 0) + 1;
  const delay = (retryCount: number) =>
    new Promise((res) => setTimeout(res, 1000 * Math.pow(2, retryCount)));

  await delay(config.retryCount);
  return instance(config);
};

// Response interceptor to handle retries
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => retryInterceptor(error)
// );

instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject = {
      data: response?.data,
    };
    return responseObject;
  },
  (error) => retryInterceptor(error)

  // function (error) {
  //   retryInterceptor(error);
  //   // Handle errors
  //   if (error.response) {
  //     // The request was made, and the server responded with a status code
  //     // that falls out of the range of 2xx
  //     console.error("Server responded with error:", error.response.status);
  //     return Promise.reject(error.response.data);
  //   } else if (error.request) {
  //     // The request was made, but no response was received
  //     console.error("No response received:", error.request);
  //     return Promise.reject(error.request);
  //   } else {
  //     // Something happened in setting up the request that triggered an Error
  //     console.error("Error setting up request:", error.message);
  //     return Promise.reject(error.message);
  //   }
  // }
);

export { instance };
