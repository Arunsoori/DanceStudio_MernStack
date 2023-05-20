import axios from 'axios';

const axiosInstance =()=>{
  console.log("in axios");
     const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    });
      //instance request interceptor 
    //   instance.interceptors.request.use((request) => {
    //     const token = localStorage.getItem(tokenName)
    //     request.headers.Authorization = `Bearer ${token}`
    //     return request
    // })

    // instance response interceptor 
    // instance.interceptors.response.use(response => response,
    //     error => Promise.reject(error.response.data)
    // )

    return instance;
}

export default axiosInstance;