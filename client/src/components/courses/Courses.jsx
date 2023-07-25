import React from "react";
import { useEffect, useState } from "react";
import { userListCourse} from "../../services/userApi";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import './cards.css'


function Courses() {
  const [courses, setCourse] = useState();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate= useNavigate()

  useEffect(() => {
    userListCourse().then((response) => {
      
      if (response.data.status) {
        setCourse(response.data.coursedata);
        setFilteredCourses(response.data.coursedata);

      } else {
        toast.error(response.data.message, {
          position: "top-centre",
        });
      }
    });
  }, []);



  useEffect(() => {
    if(courses){
    const filtered = courses.filter(course =>
      course.coursename.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
    }
  }, [searchTerm, courses]);


const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};

 function  courseDetails(courseId){
 
  navigate(`/singlepage/${courseId}`)
 }

  

  return (
    <div>

  {  courses ? <div className="container px-1">
       <div className="row justify-content-end mt-3 mb-3">
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search course"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        </div>
    <div className="row row-cols-1 row-cols-md-3 g-4 ">
      {(searchTerm? filteredCourses: courses) &&
      (searchTerm? filteredCourses: courses).map((course) => (
          
          <div key={course._id} onClick={()=>courseDetails(course._id)} className="col mb-5  ">
            <div className="card h-100 mb-5 cards ">
              <img src={`${process.env.REACT_APP_BASE_URL}/${course.image_url}`} className="card-img-top img-fluid" alt="..." />
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
    </div> : <div className="d-flex justify-content-center align-items-center vh-100">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
}
    </div>
  );
}
export default Courses;
