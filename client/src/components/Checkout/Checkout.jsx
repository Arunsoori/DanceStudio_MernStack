import React from 'react'

import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate,useParams } from "react-router-dom";
import { userSignup ,singleCourseDetails, coursePayment, verifyPayment} from "../../services/userApi";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../features/setUser";
import { userLogin } from "../../services/userApi";
import { useEffect, useState } from "react";






function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [course, setCourse] = useState()
  const {id} = useParams()
  const [price, setPrice] =useState()



  const generateError = (err) => {
    toast.error(err, {
      position: "top-centre",
    });
  };

useEffect(()=>{
  singleCourseDetails(id).then((response)=>{
    if(response.status){
      setCourse(response.data.Singledetails)
      setPrice(response.data.price)
    }else{

    }
  })

},[])


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
      password: "",
    },
    validationSchema: validate,
    //submiting the form data
    onSubmit: async (values) => {
      try {
        const { data } = await userLogin(values);
        console.log(data, "noe");
        if (data) {
          if (data.errors) {
            const { email, password } = data.errors;
            if (email) generateError(email);
            else if (password) generateError(password);
          } else {
            localStorage.setItem("jwt", data.token);
            dispatch(setUserDetails(data.user));
            navigate("/");
          }
        }
      } catch (error) {}
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


  function initpayment(data, course){
    console.log("in initpayment");
    console.log(data,"data", course, "course");
    const options = {
      key: process.env.KEY_ID,
      amount: data.amount,
      name: course.coursename,
      description: "Test transaction",
      currency: data.currency,
      order_id: data.id,
  
      handler:async(response)=>{
        try{
          console.log(response,"response");

          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

          const verificationResponse = await verifyPayment({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            course
          })
          console.log(verificationResponse ,"verificction responnse");
              if(verificationResponse.data.status){
                navigate('/paymentsuccessfull')
              }
            

        }catch(error){
          console.log(error);
        }
      }


    }
    
      const rzp1 = new Razorpay(options);
      rzp1.open();
    


  }

  function handlePayment(){
    console.log("in handle payment in front end");

    coursePayment().then((response)=>{
      if(response.status){
        initpayment(response.data.order, course)

      }
    }).catch((error)=>{
      console.log(error);
    })
     
  }

  return (
    <div>
      <div style={{ height: 'calc(100vh - 200px)' }} className="container -100vh  d-flex align-items-center justify-content-center">
        <div className="row  d-flex justify-content-between">
          <div className="col-md-4 order-md-1 order-sm-2 col-sm-12 ">
            {/* <div className="row">
              <Formik>
                <div className="loginpage-container">
                  <div className="loginpage">
                    <div className="loginpage-form">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          formik.handleSubmit();
                        }}
                      >
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            onBlur={formik.handleBlur}
                            onChange={(event) => {
                              handleChange(event);
                            }}
                            name="email"
                            type="email"
                            placeholder="email"
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            onBlur={formik.handleBlur}
                            onChange={(event) => {
                              handleChange(event);
                            }}
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500">
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </Form.Group>
                        <div className="text-center">
                          <button type="submit" className="btn btn-sm">
                            Login
                          </button>
                        </div>
                        <Link to={"/Signup"}>
                          <p className="text-center mt-3">
                            Don't have an account? <a href="">Register</a>
                          </p>
                        </Link>
                      </Form>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </Formik>
            </div> */}

            <div className="row  mb-5 " style={{ height: "50px" }}>
              <div className="form-check d-flex align-items-center  ">
                <input
                  className="form-check-input me-3"
                  type="checkbox"
                  defaultValue
                  id="flexCheckIndeterminate"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckIndeterminate"
                >
                        Razorpay
                </label>
              </div>
            </div>

            <div
              className="row bg-primary mt-5 mb-5"
              style={{ height: "50px" }}
            >
              <button style={{backgroundColor:'#3dbca8'}} className='placeorderbtn' onClick={handlePayment}>Place order</button>
            </div>
          </div>
          <div className="col-md-4   col-sm-12 d-flex align-items-center order-2 order-sm-1 ">
            <div className="card " style={{ width: "50rem" }}>
             
             
              <ul className="list-group list-group-flush ">
                {/* <li className="list-group-item">An item</li> */}
                <li style={{backgroundColor:'#f9f9f9'}} className="list-group-item d-flex justify-content-between p-3 ">
                  <div> <b>Subtotal</b> </div>
                  <div>₹ {'\u00A0'} <b>{price}</b> </div>
                   </li>
                   <li style={{backgroundColor:'#f9f9f9'}} className="list-group-item d-flex justify-content-between p-3">
                  <div> Subtotal</div>
                  <div>₹ {'\u00A0'} {price}</div>
                   </li>
                <li style={{ backgroundColor:'#f3f3f3'}} className="list-group-item d-flex justify-content-between p-3">
                  <div> <b>total</b> </div>
                   <div>₹ {'\u00A0'} <b>{price}</b> </div>   </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Checkout
