import React from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../services/userApi";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../features/setUser";
import { userLogin } from "../../services/userApi";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const generateError = (err) => {
    toast.error(err, {
      position: "top-centre",
    });
  };
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

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 order-md-1 order-sm-2 bg-dark col-sm-12">
            <div className="row">
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
            </div>

            <div className="row bg-secondary mb-5 " style={{ height: "50px" }}>
              <div className="form-check d-flex align-items-center ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="flexCheckIndeterminate"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckIndeterminate"
                >
                  Indeterminate checkbox
                </label>
              </div>
            </div>

            <div
              className="row bg-primary mt-5 mb-5"
              style={{ height: "50px" }}
            >
              <button>Place order</button>
            </div>
          </div>
          <div className="col-md-6 bg-primary  col-sm-12 d-flex align-items-center order-2 order-sm-1 ">
            <div className="card " style={{ width: "50rem" }}>
              <div className="card-header">Featured</div>
              <ul className="list-group list-group-flush ">
                {/* <li className="list-group-item">An item</li> */}
                <li className="list-group-item">Subtotal</li>
                <li className="list-group-item">total</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
