import axios from 'axios';

// const axiosInstance =()=>{ 
//      const instance = axios.create({
//         baseURL: process.env.REACT_APP_BASE_URL,
//         // timeout: 5000,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     instance.defaults.withCredentials = true;

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
    const userInstance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL
  
  });
  userInstance.defaults.withCredentials = true;

  
  userInstance.interceptors.request.use((request)=>{
      const token = localStorage.getItem("jwt")
      request.headers.Authorization = `Bearer ${token}`
      return request;  
  })
  
  
  const adminInstance = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/admin`
  })
  
  adminInstance.interceptors.request.use((request)=>{
    const token = localStorage.getItem("adminjwt")
    request.headers.Authorization = `Bearer ${token}`
    return request;  
})

  
  export { userInstance, adminInstance };
  