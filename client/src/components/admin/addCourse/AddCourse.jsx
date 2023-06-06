import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import addCourse from "../../../pages/admin/addCourse";
import { adminAddCourses, adminFacultyList } from "../../../services/adminApi";
import { useEffect, useState } from "react";



function AddCourse() {

const [faculty,setFaculty]= useState()
const [selectedImage, setSelectedImage] = useState(null);
const navigate = useNavigate()


 
useEffect(()=>{
  adminFacultyList().then((response)=>{
    console.log(response.data);
    if(response.data.status){
       setFaculty(response.data.facultydata)
    }else{
      toast.error(response.data.message,{
        position: "top-center"
      })
    }
  })


},[])




  //Yup form validation
  const validate = Yup.object({
    coursename: Yup.string()
    .required("Course name Required"),
    skill: Yup.string()
    .required("Skill level is Required"),
    description: Yup.string()
    .required("Description is Required"),
    faculty: Yup.string()
    .required("faculty is Required"),
    onemonthprice: Yup.string()
    .required("Fee for one month is required "),
    sixmonthprice: Yup.string()
    .required("Fee for six month is required "),
    oneyearprice: Yup.string()
    .required("Fee for one year is required "),
  });
  //formik state
  const formik = useFormik({
    initialValues: {
      coursename: "",
      skill: "",
      description: "",
      onemonthprice: "",
      sixmonthprice:"",
      oneyearprice:"",

      faculty: "",
      image:""
    },
    validationSchema: validate,
    //submiting the form data
    onSubmit: async(values)=>{
     console.log("on");
      const {data}= await adminAddCourses(values)
      if(data.status){
        navigate('/admin/courseList')

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
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <Formik>
      <div className="container">
    <h1 className="mb-5  mt-5"> Add Course</h1>

        <div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Course name</Form.Label>
                <Form.Control  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="coursename"
                  type="text"
                  placeholder="Enter email"
                />
                {formik.touched.coursename && formik.errors.coursename ? (
                  <div className="text-red-500">{formik.errors.coursename}</div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>skill level</Form.Label>
                <Form.Control onBlur={formik.handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="skill"
                  type="text"
                  placeholder="Skill level"
                />
                {formik.touched.skill && formik.errors.skill ? (
                  <div className="text-red-500">{formik.errors.skill}</div>
                ) : null}
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Description</Form.Label>
              <Form.Control onBlur={formik.handleBlur}
                onChange={(event) => {
                  handleChange(event);
                }}
                name="description"
                type="text"
                placeholder="details"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500">{formik.errors.description}</div>
              ) : null}
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group> */}

      { faculty && 
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Add Faculty</Form.Label>
              <Form.Control onBlur={formik.handleBlur}
                onChange={(event) => {
                  handleChange(event);
                }}
                name="faculty"
                // type="string"
                type="String"

                as="select"
                defaultValue=""
                
              >
                <option value="">Add Faculty</option>
                {faculty.map((f)=>(
                <option  key={f._id} value={f._id}>{f._id}</option>

                ))}
               
              </Form.Control>
              {formik.touched.faculty && formik.errors.faculty ? (
                <div className="text-red-500">{formik.errors.faculty}</div>
              ) : null}
            </Form.Group>
}

            <Row className="mb-3">
              {/* <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Price for one month</Form.Label>
                <Form.Control
                  name="onemonthprice"
                  type="number"
                  placeholder="fee for one month"
                />
                {formik.touched.onemonthprice && formik.errors.onemonthprice ? (
                  <div className="text-red-500">
                    {formik.errors.onemonthprice}
                  </div>
                ) : null}
              </Form.Group> */}
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Price for one months</Form.Label>
                <Form.Control onBlur={formik.handleBlur}
                 onChange={(event) => {
                  handleChange(event);
                }}
                name="onemonthprice"
                type="number"
               
                />
                 {formik.touched.onemonthprice && formik.errors.onemonthprice ? (
                  <div className="text-red-500">
                    {formik.errors.onemonthprice}
                  </div>
                ) : null}
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Price for 6 months</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group> */}
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Price for 6 months</Form.Label>
                <Form.Control onBlur={formik.handleBlur}
                 onChange={(event) => {
                  handleChange(event);
                }}
                name="sixmonthprice"
                type="number"
               
                />
                 {formik.touched.sixmonthprice && formik.errors.sixmonthprice ? (
                  <div className="text-red-500">
                    {formik.errors.sixmonthprice}
                  </div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Price for 1 year</Form.Label>
                <Form.Control onBlur={formik.handleBlur}
                 onChange={(event) => {
                  handleChange(event);
                }}
                name="oneyearprice" 
                type="number"
                />
                {formik.touched.oneyearprice && formik.errors.oneyearprice ? (
                  <div className="text-red-500">
                    {formik.errors.oneyearprice}
                  </div>
                ) : null}
                   
                
              </Form.Group>
            </Row>

            {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

{ selectedImage &&
      <div  style={{width:"15%", height:"200px", backgroundColor: "#d5531f"}} className="mb-3   ">
        <img   style={{ width: "100%", height: "100%", objectFit: "contain" }}  src={selectedImage} alt=""  />
      </div>
}
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
        </div>
      </div>
    </Formik>
  );
}

export default AddCourse;
