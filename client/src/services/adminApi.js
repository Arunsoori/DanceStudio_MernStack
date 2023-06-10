import  { adminInstance } from '../axios/axios'



export const adminLogin = (values)=>{
    return adminInstance.post("/login",{...values})
}
export const adminAddCourses = (values)=>{
    console.log("in admininstance");
    return adminInstance.post("/addCourse",{...values},{ headers: { "Content-Type": "multipart/form-data" }})
}
export const adminAddFaculty = (values)=>{
    console.log("in admininstance");
    return adminInstance.post("/addFaculty",{...values},{ headers: { "Content-Type": "multipart/form-data" }})
}
export const adminsideUserList = ()=>{
    console.log("inadminsideuserlist");
    return adminInstance.get("/listUsers")
}
export const adminFacultyList = ()=>{
    console.log("inadmfacultylist");
    return adminInstance.get("/listFaculty")
}
export const adminCourseList = ()=>{
    console.log("inadmcourselist");
    return adminInstance.get("/listCourse")
}
export const adminDeleteCourse = (courseId)=>{
    console.log("in admin delete");
    return adminInstance.get(`/deletecourse/${courseId}`)
}
export const adminEditCourse = (courseId)=>{
    console.log("in admin edit", courseId);
    return adminInstance.get(`/editcourse/${courseId}`)
}
export const updateCourseData = (values,id)=>{
    console.log("in admin update", id);
    return adminInstance.post(`/updatecourse/${id}`, {...values},{ headers: { "Content-Type": "multipart/form-data" }})
}
export const orderDetails = ()=>{
    console.log("in admin orderdetails", );
    return adminInstance.post('/order',orderDetails)
}
export const orderCancel = (orderId)=>{
    console.log("cancel order  user serveibces");
    return adminInstance.post(`/ordercancel/${orderId}`,orderCancel )
}

