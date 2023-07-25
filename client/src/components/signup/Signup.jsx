import "./signup.css";
import React from "react";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { userSignup } from "../../services/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


function Signup() {
 const navigate= useNavigate()



  //Yup form validation
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .matches(/^[^#\s]+$/, 'Field cannot contain hashes or white spaces')
      .required("First Name Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is Required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is Required "),
  });

  //formik state
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: validate,
    //submiting the form data
    onSubmit: async (values) => {
      try{
        const {data} = await userSignup(values)
        if(data.status){
    navigate ('/otp')
        }
     toast.error(data.error)

        

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
      <div className="signup-container">
        <div className="signup">
          <div className="signup-image">
            <img src="../../..//signup_removed.png" alt="Signup" className="img-fluid" />
          </div>
          <div className="signup-form">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>name</Form.Label>
                <Form.Control  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="firstName"
                  type="text"
                  placeholder="name"
                  style={{ fontSize: '20px' }}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500">{formik.errors.firstName}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>email</Form.Label>
                <Form.Control  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="email"
                  type="email"
                  placeholder="email"
                  style={{ fontSize: '20px' }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label> Password</Form.Label>
                <Form.Control  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="password"
                  type="password"
                  placeholder="password"
                  style={{ fontSize: '20px' }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>confirm password</Form.Label>
                <Form.Control  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="confirmpassword"
                  type="password"
                  placeholder="confirm password"
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
                  Sign Up
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

export default Signup;
