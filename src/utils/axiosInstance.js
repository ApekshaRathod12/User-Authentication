import axios from 'axios';
import { showToast } from '../pages/Toast';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  config => {
    console.log('Request Interceptor:', config);
    const token = localStorage.getItem('jwt'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // const abortController = new AbortController();
    // config.signal = config.abortController.signal;
    return config;
  },
  error => {
    return console.error(error);
  }
);

// export const cancelRequest = (requestConfig) => {
//   if (requestConfig.abortController) {
//     requestConfig.abortController.abort(); 
//   }
// };

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response Interceptor:', response);
    return response;
  },
     error => {
            if (!error.response) {
              showToast('error','Network error. Please check your connection.')
            } else if (error.response.status === 401) {
              showToast('error','Unauthorized. Please Log in again')
              localStorage.removeItem('jwt'); 
              window.location.href = '/login'; 
            } else if (error.response.status === 403) {
              showToast('error','You do not have permission to perform this action.')
            } else {
              showToast('error',`Error :${error.response.data.message}`)
            }
            return console.error(error);
          }
    );
    
    export default axiosInstance;