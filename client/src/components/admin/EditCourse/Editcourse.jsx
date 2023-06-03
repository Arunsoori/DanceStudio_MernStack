

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { adminAddCourses, adminEditCourse, adminFacultyList ,updateCourseData } from "../../../services/adminApi";
import { useEffect, useState } from "react";




function Editcourse() {
    const {id} = useParams()
    // const [course, setCourse]= useState({})
    const [faculty, setFaculty] = useState()
    useEffect(()=>{
        console.log("in usefeect");
        console.log(id,"in edit course");
        adminEditCourse(id).then((response)=>{
  console.log(response.status,"status");
          console.log(response.data.singleCourseData,"data in front");
          if(response.status){
   const course =response.data.singleCourseData
           formik.setValues( {
            coursename:course.coursename,
            skill: course.skill,
            description: course.description,
            onemonthprice: course.onemonthprice,
            sixmonthprice:course.sixmonthprice,
            oneyearprice:course.oneyearprice,
      
            faculty: course.facultyId,
            image: course.image_url
          })
          }

          
        })

        adminFacultyList().then((response)=>{
          console.log(response.data.facultydata,"faclty data iin front");
  if(response.status){
    setFaculty(response.data.facultydata)
  }

        })


    },[id])


const navigate = useNavigate()


 





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
      coursename:"",
      skill: "",
      description: "",
      onemonthprice: "",
      sixmonthprice:"",
      oneyearprice:"",

      faculty:"",
      image: ""
    },
    validationSchema: validate,
    //submiting the form data
    onSubmit: async(values)=>{
     console.log("on");
      const {data}= await updateCourseData(values,id)
      console.log(data);
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

  return (
    <Formik>
    
      <div className="container">
    <h1 className="mb-5  mt-5"> Edit Course</h1>

        <div>
        {(
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
                  value={formik.values.coursename}
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
                  value={formik.values.skill}
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
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500">{formik.errors.description}</div>
              ) : null}
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group> */}

   
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Add Faculty</Form.Label>
              <Form.Control onBlur={formik.handleBlur}
                onChange={(event) => {
                  handleChange(event);
                }}
                name="faculty"
                // type="string"
                type="String"
                // value={course.faculty}

                as="select"
                // defaultValue=""
                
              >{}
                <option value="">Add Faculty</option>
                
               {faculty  && faculty.map((fa)=>(
                  <option value={fa._id}>{fa.name}</option>
               )) }

            
               
              </Form.Control>
              {formik.touched.faculty && formik.errors.faculty ? (
                <div className="text-red-500">{formik.errors.faculty}</div>
              ) : null}
            </Form.Group>


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
                value={formik.values.onemonthprice}
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
                value={formik.values.sixmonthprice}
               
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
                value={formik.values.oneyearprice}

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
            <Form.Group controlId="formGridImage">
              <Form.Label>Image</Form.Label>
              <Form.Control  onBlur={formik.handleBlur}
              onChange={(e)=>{
                const file = e.currentTarget.files[0];
                formik.setFieldValue('image', file);
           }}
              name="image"
              type="file" accept="image/*" />
               

            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
        </div>
      </div>

    </Formik>
  );
}

export default Editcourse;
