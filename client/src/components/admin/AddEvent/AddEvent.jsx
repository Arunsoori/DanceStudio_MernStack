import React from 'react'
import { MdClass } from 'react-icons/md'
import { submitEvent } from '../../../services/adminApi'
import * as Yup from "yup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";




import { useFormik, Formik } from "formik";
import { useState, useEffect } from 'react';



function AddEvent() {
const [selectedImage, setSelectedImage] = useState(null);


  //formik state
  const formik = useFormik({
    initialValues: {
     
      image:"",
     
    },
   
    //submiting the form data
    onSubmit: async(values)=>{
     console.log("on");
      const {data}= await submitEvent(values)
      if(data.status){
        // navigate('/admin/courseList')

      }
    },
  });
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
    setSelectedImage(URL.createObjectURL(file));
  };
  
  return (
    < div  className='container'>
    <h1 className="mb-5  mt-5"> Add Event</h1>

      <div>
    <Formik>
    <Form  
     onSubmit={(e) => {
      e.preventDefault();
      formik.handleSubmit();
    }}
    >
        <Form.Group controlId="formGridImage">
              <Form.Label>Image</Form.Label>
              <Form.Control  onBlur={formik.handleBlur}
          //     onChange={(e)=>{
                
          //       const file = e.currentTarget.files[0];
          //       formik.setFieldValue('image', file);
          //  }}
         
          onChange={handleImageChange}
              name="image"
              type="file" accept="image/*" />

            </Form.Group>

            <Button style={{backgroundColor:'#d5531f'}} className="border-0 outline-0 mt-5 " type="submit">
              Submit
            </Button>
          </Form>
          </Formik>
          </div>

    </div>
  )
}

export default AddEvent