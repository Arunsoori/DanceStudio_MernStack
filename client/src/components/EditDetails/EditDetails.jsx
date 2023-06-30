import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../../services/userApi";
import { userDetailsChange } from "../../services/userApi";

function EditDetails({ setActiveTab }) {
  const navigate = useNavigate();

  // const [details, setDetails] = useState();

  useEffect(() => {
    userDetails().then((response) => {
      if (response.data.status) {
        const user = response.data.user;
        formik.setValues({
          firstName: user.firstName,
          email: user.email,
        });
      }
    });
  }, []);

  // Yup form validation
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .matches(/^[^#\s]+$/, "Field cannot contain hashes or white spaces")
      .required("First Name Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
  });

  // formik state
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      try {
        const { data } = await userDetailsChange(values);
        if (data.status) {
          setActiveTab();
        }

        // if (data.status) {
        //   toast(data.messsage, {
        //     position: 'top-center'
        //   });
        //   navigate('/courses');
        // }
        // toast.error(data.message);
      } catch (error) {
        // Handle error
      }
    },
  });

  // Handle the input changes
  const handleChange = (event) => {
    formik.setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Conditional rendering when details is still undefined
  // if (!details) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="password-container  mb-5">
      <div className="signup">
        <div className="signup-form">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onBlur={formik.handleBlur}
                onChange={handleChange}
                name="firstName"
                type="text"
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500">{formik.errors.firstName}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onBlur={formik.handleBlur}
                onChange={handleChange}
                name="email"
                type="email"
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
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
  );
}

export default EditDetails;
