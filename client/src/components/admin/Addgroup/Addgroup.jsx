import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useEffect,useState } from "react";
import { adminAddGroup } from "../../../services/adminApi";


function Addgroup() {
  const navigate = useNavigate();
// const [selectedImage, setSelectedImage] = useState(null);


  //Yup form validation
  const validate = Yup.object({
    name: Yup.string()
    .required("Course name Required"),
    description: Yup.string()
    .required("description  is Required")
   
   
  });
  //formik state
  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
     
    },
    validationSchema: validate,
    //submiting the form data
    onSubmit: async(values)=>{
     console.log("on submit");
      const {data}= await adminAddGroup(values)
      console.log(data,"daata");
     
      if(data.status){
      navigate('/admin/grouplist')
      }else{
        console.log(data.message);
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
//   const handleImageChange = (event) => {
//     const file = event.currentTarget.files[0];
//     formik.setFieldValue("image", file);
//     setSelectedImage(URL.createObjectURL(file));
//   };

  return (
    <Formik>
      <div className="container">
    <h1 className="mb-5  mt-5"> Add Group</h1>

        <div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Group name</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="name"
                  type="text"
                  placeholder="name of group"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="post"
                  type="text"
                  placeholder=" post"
                />
                {formik.touched.post && formik.errors.post ? (
                  <div className="text-red-500">{formik.errors.post}</div>
                ) : null}
              </Form.Group> */}
            </Row>

            
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>description</Form.Label>
              <Form.Control
                onChange={(event) => {
                  handleChange(event);
                }}
                name="description"
                type="text"
                placeholder="description"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500">{formik.errors.description}</div>
              ) : null}
            </Form.Group>

           


            <Button style={{backgroundColor:'#d5531f'}}  type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Formik>
  );
}

export default Addgroup;
