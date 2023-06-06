import  { userInstance } from '../axios/axios'

//signup
// export const userSignup = (values)=>{
//     console.log("in services");
//     return userin ().post("/signup", { ...values });
// }
// export const verifyOtp=(otp)=>{
//     return userInstance().post("/verifyotp",{otp},)
// }

export const userSignup = (values)=>{
    return userInstance.post("/signup",{...values})
}
export const userLogin = (values)=>{
    return userInstance.post("/login",{...values})
}
export const verifyOtp = (otp)=>{
    return userInstance.post("/verifyotp",{otp})
}
export const Home = ()=>{
    return userInstance.get("/")
}
export const singleCourseDetails = (Id)=>{
    console.log(Id, "id in user serveibces");
    return userInstance.get(`/singlepage/${Id}` )
}
export const FetchFacultydetails = (Id)=>{
    console.log(Id, "id in user serveibces");
    return userInstance.get(`/facultydetails/${Id}` )
}
export const FetchPackageAmount = (option,id)=>{
    console.log(option, "option in user serveibces");
    return userInstance.get(`/packageamount/${option}/${id}` )
}
export const packagePrice = ()=>{
    console.log("package price in user serveibces");
    return userInstance.get("/packageprice" )
}
export const coursePayment = ()=>{
    console.log("coursepaymentin user serveibces");
    return userInstance.get("/buy-course" )
}
export const verifyPayment = (data)=>{
    console.log("verifypayment user serveibces");
    return userInstance.post("/verifypayment",data )
}