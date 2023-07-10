import React from 'react'
import Form from "react-bootstrap/Form";

import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userPasswordChange } from '../../services/userApi';



// function Password() {
//   return (
//     <div>
//          <div>
//       <input type="text" className="form-control" placeholder="Text 1" />
//       <input type="text" className="form-control" placeholder="Text 2" />
//       <input type="text" className="form-control" placeholder="Text 3" />
//     </div>
//     </div>
//   )
// }

// export default Password
function Password() {
  const navigate= useNavigate()
  
 
 
 
   //Yup form validation
   const validate = Yup.object({
 
     currentpassword: Yup.string()
       .min(6, "Password must be at least 6 charaters")
       .required("Password is Required"),
       newpassword: Yup.string()
       .min(6, "Password must be at least 6 charaters")
       .required("Password is Required"),
     confirmpassword: Yup.string()
       .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
       .required("Confirm Password is Required "),
   });
 
   //formik state
   const formik = useFormik({
     initialValues: {
       
      currentpassword: "",
       newpassword: "",
       confirmpassword: "",
     },
     validationSchema: validate,
     //submiting the form data
     onSubmit: async (values) => {
      console.log("onsubmit");
       try{
         const {data} = await userPasswordChange(values)
         console.log(data);
         
         if(data.status){

          toast(data.messsage,{
            position:'top-center'
          });
     navigate ('/courses')
         }
      toast.error(data.message)
 
         
 
       } catch (error){
 
       }
    
 
 
     },
   });
 
   //handle the input changes
   const handleChange = (event) => {
     formik.setValues((prev) => {
       const formFields = { ...prev };
       formFields[event.target.name] = event.target.value;
       return formFields;
     });
   };
 
   return (
     <Formik>
       <div className="password-container  mb-5">
         <div className="signup">
          
           <div className="signup-form">
             <Form
               onSubmit={(e) => {
                 e.preventDefault();
                 formik.handleSubmit();
               }}
             >
               {/* <Form.Group className="mb-3" controlId="formGroupEmail">
                 <Form.Label>name</Form.Label>
                 <Form.Control  onBlur={formik.handleBlur}
                   onChange={(event) => {
                     handleChange(event);
                   }}
                   name="firstName"
                   type="text"
                   placeholder="name"
                 />
                 {formik.touched.firstName && formik.errors.firstName ? (
                   <div className="text-red-500">{formik.errors.firstName}</div>
                 ) : null}
               </Form.Group> */}
 
               <Form.Group className="mb-3" controlId="formGroupPassword">
                 <Form.Label>Current password</Form.Label>
                 <Form.Control  onBlur={formik.handleBlur}
                   onChange={(event) => {
                     handleChange(event);
                   }}
                   name="currentpassword"
                   type="password"
                   placeholder="current password"
                style={{ fontSize: '20px' }}

                 />
                 {formik.touched.currentpassword && formik.errors.currentpassword ? (
                   <div className="text-red-500">{formik.errors.currentpassword}</div>
                 ) : null}
               </Form.Group>
               <Form.Group className="mb-3" controlId="formGroupPassword">
                 <Form.Label> New password</Form.Label>
                 <Form.Control  onBlur={formik.handleBlur}
                   onChange={(event) => {
                     handleChange(event);
                   }}
                   name="newpassword"
                   type="password"
                   placeholder="password"
                style={{ fontSize: '20px' }}

                 />
                 {formik.touched.newpassword && formik.errors.newpassword ? (
                   <div className="text-red-500">{formik.errors.newpassword}</div>
                 ) : null}
               </Form.Group>
               <Form.Group className="mb-3" controlId="formGroupPassword">
                 <Form.Label>Confirm password</Form.Label>
                 <Form.Control  onBlur={formik.handleBlur}
                   onChange={(event) => {
                     handleChange(event);
                   }}
                   name="confirmpassword"
                   type="password"
                   placeholder="new password"
                style={{ fontSize: '20px' }}

                 />
                 {formik.touched.confirmpassword &&
                 formik.errors.confirmpassword ? (
                   <div className="text-red-500">
                     {formik.errors.confirmpassword}
                   </div>
                 ) : null}
               </Form.Group>
               {/* Add additional form inputs here */}
               <div className="text-center">
                 <button type="submit" className="btn btn-xs ">
                   Submit
                 </button>
               </div>
    
 
             </Form>
             <ToastContainer />
           </div>
         </div>
       </div>
     </Formik>
 
     
   );
 }
 
 export default Password;