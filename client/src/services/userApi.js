import axiosInstance from '../axios/axios'

//signup
export const userSignup = (values)=>{
    console.log("in services");
    return axiosInstance().post("/signup", { ...values });
}