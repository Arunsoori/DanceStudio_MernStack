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
export const userListCourse = ()=>{
    return  userInstance.get('/coursedata' )
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
export const userPasswordChange = (values)=>{
    console.log("passowrd change user serveibces");
    return userInstance.post("/passwordchange",{...values} )
}
export const userDetailsChange = (values)=>{
    console.log("detailschange in user serveibces");
    return userInstance.post("/editdetails",{...values} )
}
export const profilePicture = (formData)=>{
    console.log("passowrd change user serveibces");
    return userInstance.post("/profilepicture",formData,{ headers: { "Content-Type": "multipart/form-data" }} )
}
export const userDetails = ()=>{
    console.log("passowrd change user serveibces");
    return userInstance.post("/userdetails",userDetails)
}
export const sendMessage = (roomId, message) => {
    console.log(" in send message api");
    return userInstance.post('/send-message', { roomId, message });
  };
  export const messageDetails = (roomId) => {
    console.log(" in messagedetails api");
    console.log(roomId,"rooomid");
    return userInstance.post('/messagedetails', { roomId });
  };
  export const EventFetch = ()=>{
    console.log(" user serveibces");
    return userInstance.post("/eventfetch",EventFetch)
}

export const Ourfaculties = ()=>{
    console.log(" user serveibces");
    return userInstance.get("/ourfaculties",Ourfaculties)
}
export const activeOrders = ()=>{
    console.log(" user serveibces");
    return userInstance.get("/activeorders",activeOrders)
}

