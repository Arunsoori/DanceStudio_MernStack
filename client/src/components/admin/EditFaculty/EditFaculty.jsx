import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate,useParams } from "react-router-dom";
import { adminEditFaculty, admineditFaculty , adminUpdateFaculty} from "../../../services/adminApi";
import { useEffect, useState } from "react";


function EditFaculty() {
  const navigate = useNavigate();
  const {id} = useParams()
const [selectedImage, setSelectedImage] = useState(null);

 

  // const [faculty,setFaculty] = useState()
//   const [faculty,setFaculty]= useState()


  useEffect(()=>{
    adminEditFaculty(id).then((response)=>{
        console.log(response.data.facultydetails,"singlefaculy daya");
        // setFaculty(response.data.facultydetails)
        if(response.status){
          const faculty =response.data.facultydetails
                  formik.setValues( {
                   name:faculty.name,
                   
                   post: faculty.position,
                   styles: faculty.styles,
                   biography: faculty.biography,
                   image:faculty.image_url,
                 
                 })
                 }

        
    })

  },[])

  //Yup form validation
  const validate = Yup.object({
    name: Yup.string()
    .required("Course name Required"),
    post: Yup.string()
    .required("Skill level is Required"),
    styles: Yup.string()
    .required("styles required "),
    biography: Yup.string()
    .required("biography is Required"),
   
  });
  //formik state
  const formik = useFormik({
    initialValues: {
      name: "",
      post: "",
      styles: "",
      biography: "",
       image:""
    },
    validationSchema: validate,
    //submiting the form data
    onSubmit: async(values)=>{
     console.log("on submit");
      const {data}= await adminUpdateFaculty(values,id)
     
      if(data.status){
      navigate('/admin/facultyList')
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
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
    setSelectedImage(URL.createObjectURL(file));
  };

  return (

    <Formik>
      <div className="container">
    <h1 className="mb-5  mt-5"> Edit Faculty</h1>

        <div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Faculty name</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="name"
                  type="text"
                  placeholder="name of faculty"
                  value={formik.values.name}

                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="post"
                  type="text"
                  placeholder=" post"
                  value={formik.values.post}

                />
                {formik.touched.post && formik.errors.post ? (
                  <div className="text-red-500">{formik.errors.post}</div>
                ) : null}
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>styles</Form.Label>
              <Form.Control
                onChange={(event) => {
                  handleChange(event);
                }}
                name="styles"
                type="text"
                placeholder="styles"
                value={formik.values.styles}

              />
              {formik.touched.styles && formik.errors.styles ? (
                <div className="text-red-500">{formik.errors.styles}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>biography</Form.Label>
              <Form.Control
                onChange={(event) => {
                  handleChange(event);
                }}
                name="biography"
                type="text"
                placeholder="biography"
                value={formik.values.biography}

              />
              {formik.touched.biography && formik.errors.biography ? (
                <div className="text-red-500">{formik.errors.biography}</div>
              ) : null}
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group> */}
            {/* <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Add Faculty</Form.Label>
              <Form.Control
                onChange={(event) => {
                  handleChange(event);
                }}
                name="faculty"
                as="select"
                defaultValue=""
                
              >
                <option value="">Add Faculty</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
                <option value="Option 4">Option 4</option>
              </Form.Control>
              {formik.touched.faculty && formik.errors.faculty ? (
                <div className="text-red-500">{formik.errors.faculty}</div>
              ) : null}
            </Form.Group> */}

            {/* <Row className="mb-3">
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
              {/* <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Price for one months</Form.Label>
                <Form.Control 
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
              {/* <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Price for 6 months</Form.Label>
                <Form.Control 
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
                <Form.Control
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
              <Form.Control 
          //     onChange={(e)=>{
          //       const file = e.currentTarget.files[0];
          //       formik.setFieldValue('image', file);
          //  }}
           onChange={handleImageChange}
           name="image"
           type="file" accept="image/*" />

            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Formik>
  );
}

export default EditFaculty;
