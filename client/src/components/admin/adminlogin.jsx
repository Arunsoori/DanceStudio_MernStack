// // import React, { useState } from "react";


// import Form from 'react-bootstrap/Form';

// // import "../login/Login.css";

// const adminLogin = () => {
//   // const [loginData, setLoginData] = useState({
//   //   email: "",
//   //   password: "",
//   // });

//   return (
//     <>
//       <div className="loginpage-container">
//   <div className="loginpage">
//     <div className="loginpage-image">
//       <img src="../../..//signup_removed.png" alt="Signup" />
//     </div>
//     <div className="loginpage-form">
//       <Form>
//         <Form.Group className="mb-3" controlId="formGroupEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control type="email" placeholder="Enter email" />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formGroupPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" placeholder="Password" />
//         </Form.Group>
//         <div className="text-center">
//           <button type="submit" className="btn btn-sm">Login</button>
//         </div>
        
//       </Form>
//     </div>
//   </div>
// </div>

//     </>
//   );
// };

// export default adminLogin;
// import React, { useState } from "react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from "react-toastify";
import { useFormik, Formik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { adminLogin } from "../../services/adminApi";
import { useDispatch } from "react-redux";




import "../login/Login";
// import { setUserDetails } from "../../features/setUser";


const Login = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("adminjwt")
    if(token){
      navigate("/admin/dashboard")
    }
  },[])
  // const [loginData, setLoginData] = useState({
  //   email: "",
  //   password: "",
  // });
  // const dispatch= useDispatch()
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
        const {data} = await adminLogin(values)
        console.log(data)
        if(data.status){
          toast(data.message)
          localStorage.setItem("adminjwt",data.token)
          navigate('/admin/dashboard')
        }else{
          toast.error(data.message)
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
          <Form.Control
           onChange={(event) => {
            handleChange(event);
          }}
           name="email" type="email" placeholder="email"
           style={{ fontSize: '20px' }} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          onChange={(event) => {
            handleChange(event);
          }}
           name="password" type="password" placeholder="Password"
           style={{ fontSize: '20px' }} />
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
