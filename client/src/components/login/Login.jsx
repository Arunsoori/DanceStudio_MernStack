// import React, { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from "react-toastify";
import { useFormik, Formik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { userLogin } from "../../services/userApi";
import { useDispatch } from "react-redux";




import "./Login.css";
import { setUserDetails } from "../../features/setUser";

const Login = () => {
  // const [loginData, setLoginData] = useState({
  //   email: "",
  //   password: "",
  // });
const navigate = useNavigate()
const dispatch= useDispatch()
const generateError=(err)=>{
  toast.error(err,{
    position:"top-centre"
  })
}


   //Yup form validation
   const validate = Yup.object({
 
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is Required"),
   
  });
  //formik state
  const formik = useFormik({
    initialValues: {
      
      email: "",
      password: ""
      
    },
    validationSchema: validate,
    //submiting the form data
    onSubmit: async (values) => {
      try{
        const {data} = await userLogin(values)
        console.log(data,"noe");
         if(data){
          if(data.errors){
            const {email,password}= data.errors;
            if(email) generateError(email)
            else if(password) generateError(password)
          }else{
            localStorage.setItem("jwt", data.token)
            dispatch(setUserDetails(data.user))
            navigate('/')
          }
         }

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

    
      <div className="loginpage-container">
  <div className="loginpage">
    <div className="loginpage-image">
      <img src="../../..//signup_removed.png" alt="Signup" />
    </div>
    <div className="loginpage-form">
      <Form
       onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={formik.handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="email"
                  type="email"
                  placeholder="email"
                />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={formik.handleBlur}
          onChange={(event) => {
            handleChange(event);
          }}
           name="password" type="password" placeholder="Password" />
           {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
        </Form.Group>
        <div className="text-center">
          <button type="submit" className="btn btn-sm">Login</button>
        </div>
        <Link to={'/Signup'}>
        <p className="text-center mt-3">Don't have an account? <a href="">Register</a></p>
        </Link>
      </Form>
      <ToastContainer />

    </div>
  </div>
</div>
</Formik>

    
  );
};

export default Login;
