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
export const admineditFaculty = (values)=>{
    console.log("in admininstance");
    return adminInstance.post("/addFaculty",{...values},{ headers: { "Content-Type": "multipart/form-data" }})
}
export const adminsideUserList = ()=>{
    console.log("inadminsideuserlist");
    return adminInstance.get("/listUsers")
}
export const adminFacultyList = (page)=>{
    console.log("inadmfacultylist");
    return adminInstance.get(`/listFaculty?page=${page}`)
    
}
export const adminEditFaculty = (facultyId)=>{
    console.log("inadmfacultylist");
    return adminInstance.get(`/editfaculty/${facultyId}`)
    
}


export const adminUpdateFaculty = (values,facultyId)=>{
    console.log("in update faculty");
    return adminInstance.post(`/updatefaculty/${facultyId}`, {...values},{ headers: { "Content-Type": "multipart/form-data" }})
    
}
export const adminDeleteFaculty = (facultyId)=>{
    console.log("in admin delete");
    console.log(facultyId);
    return adminInstance.delete(`/deletefaculty/${facultyId}`)
}
// export const adminCourseList = ()=>{
//     console.log("inadmcourselist");
//     return adminInstance.get("/listCourse")
// }
export const adminCourseList = (page) => {

    console.log("in adminn courselist");
    return adminInstance.get(`/listCourse?page=${page}`);
  };
export const adminDeleteCourse = (courseId)=>{
    console.log("in admin delete");
    return adminInstance.delete(`/deletecourse/${courseId}`)
}
export const adminEditCourse = (courseId)=>{
    console.log("in admin edit", courseId);
    return adminInstance.get(`/editcourse/${courseId}`)
}
export const updateCourseData = (values,id)=>{
    console.log("in admin update", id);
    return adminInstance.post(`/updatecourse/${id}`, {...values},{ headers: { "Content-Type": "multipart/form-data" }})
}
export const orderDetails = (page)=>{
    console.log("in admin orderdetails", );
    console.log(page,"page");
    return adminInstance.post(`/order?page=${page}`)
}
export const orderCancel = (orderId)=>{
    console.log("cancel order  user serveibces");
    return adminInstance.post(`/ordercancel/${orderId}`,orderCancel )
}
export const orderData = ()=>{
    console.log("in admin orderddata", );
 
    return adminInstance.post("/orderdata")
}


