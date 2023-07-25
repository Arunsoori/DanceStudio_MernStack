import React from "react";

import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  userSignup,
  singleCourseDetails,
  coursePayment,
  verifyPayment,
} from "../../services/userApi";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../features/setUser";
import { userLogin } from "../../services/userApi";
import { useEffect, useState } from "react";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [course, setCourse] = useState();
  const { id } = useParams();
  const [price, setPrice] = useState();

  const generateError = (err) => {
    toast.error(err, {
      position: "top-centre",
    });
  };

  useEffect(() => {
    singleCourseDetails(id).then((response) => {
      if (response.status) {
        console.log(response.data.Singledetails);
        setCourse(response.data.Singledetails);
        setPrice(response.data.price);
      } else {
      }
    });
  }, []);

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

  function initpayment(data, course) {
    console.log("in initpayment");
    console.log(data, "data", course, "course");
    const options = {
      key: process.env.KEY_ID,
      amount: data.amount,
      name: course.coursename,
      description: "Test transaction",
      currency: data.currency,
      order_id: data.id,

      handler: async (response) => {
        try {
          console.log(response, "response");

          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const verificationResponse = await verifyPayment({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            course,
          });
          console.log(verificationResponse, "verificction responnse");
          if (verificationResponse.data.status) {
            navigate("/paymentsuccessfull");
          }
        } catch (error) {
          console.log(error);
        }
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  }

  function handlePayment() {
    console.log("in handle payment in front end");

    coursePayment()
      .then((response) => {
        if (response.status) {
          initpayment(response.data.order, course);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h2 className="p-4 text-center" >Confirm order</h2>
      <div
        // style={{ height: "calc(100vh - 200px)" }}
        className="container-fluid d-flex align-items-center justify-content-center"
      >
        <div className="row mb-5 d-flex justify-content-center align-items-center  " style={{background:"#F1F9F9"}}>
          <div className="col-md-8 col-sm-8 d-flex align-items-center justify-content-center order-2 order-sm-2 ">
            <div className="card " style={{ width: "50vw" , height:"318px" }}>
              <ul className="list-group list-group-flush ">
                {/* <li className="list-group-item">An item</li> */}
                {course && (
                  <li
                    style={{ backgroundColor: "#f9f9f9" }}
                    className="list-group-item d-flex justify-content-between p-3 "
                  >
                    <div>
                      {" "}
                      <b>{course.coursename}</b>{" "}
                    </div>
                    <div>
                      ₹ {"\u00A0"} <b>{price}</b>{" "}
                    </div>
                  </li>
                )}
                <li
                  style={{ backgroundColor: "#f9f9f9" }}
                  className="list-group-item d-flex justify-content-between p-3"
                >
                  <div> Subtotal</div>
                  <div>
                    ₹ {"\u00A0"} {price}
                  </div>
                </li>
                <li
                  style={{ backgroundColor: "#f3f3f3" }}
                  className="list-group-item d-flex justify-content-between p-3"
                >
                  <div>
                    {" "}
                    <b>total</b>{" "}
                  </div>
                  <div>
                    ₹ {"\u00A0"} <b>{price}</b>{" "}
                  </div>{" "}
                </li>
              </ul>
              <div
                className="row  mt-5"
                style={{ height: "50px" }}
              >
                <button
                  style={{ backgroundColor: "#3dbca8" }}
                  className="placeorderbtn"
                  onClick={handlePayment}
                >
                  Place order
                </button>
              </div>
            </div>
          
          </div>
          <div className=" col-md-4 col-sm-8 d-flex justify-content-center">
          <img src="/fa8f451802568de290f4c860d17fb57d.jpg" alt="" 
            className="img-fluid checkout-image" style={{height:"500px"}} />
        </div>
        </div>
 
      </div>
     
    </div>
  );
}

export default Checkout;
