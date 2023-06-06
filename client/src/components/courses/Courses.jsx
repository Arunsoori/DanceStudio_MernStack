import React from "react";
import { useEffect, useState } from "react";
import { adminCourseList } from "../../services/adminApi";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import './cards.css'


function Courses() {
  const [courses, setCourse] = useState();
  const navigate= useNavigate()

  useEffect(() => {
    adminCourseList().then((response) => {
      
      if (response.data.status) {
        setCourse(response.data.coursedata);
      } else {
        toast.error(response.data.message, {
          position: "top-centre",
        });
      }
    });
  }, []);

 function  courseDetails(courseId){
 
  navigate(`/singlepage/${courseId}`)
 }

  

  return (
    <div className="container px-1">
    <div className="row row-cols-1 row-cols-md-3 g-4 ">
      {courses &&
        courses.map((course) => (
          
          <div key={course._id} onClick={()=>courseDetails(course._id)} className="col mb-5  ">
            <div className="card h-100 mb-5 cards ">
              <img src={`${process.env.REACT_APP_BASE_URL}/${course.image_url}`} className="card-img-top" alt="..." />
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title  text-centre">{course.coursename}</h5>
                <p className="card-text text-centre">
                ₹ {course.onemonthprice}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
    </div>
  );
}
export default Courses;
