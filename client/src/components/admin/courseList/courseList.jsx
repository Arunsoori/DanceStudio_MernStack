import React from "react";
import { useState, useEffect } from "react";
import { adminCourseList, adminDeleteCourse } from "../../../services/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./courselist.css";

function CourseList() {
  const [courses, setCourse] = useState();
  const navigate= useNavigate()

  useEffect(() => {
    adminCourseList().then((response) => {
      console.log(response.data.coursedata);
      if (response.data.status) {
        setCourse(response.data.coursedata);
      } else {
        toast.error(response.data.message, {
          position: "top-centre",
        });
      }
    });
  }, []);
  function editCourse(courseId){
  
    navigate(`/admin/editcourse/${courseId}`)
  }

  return (
    <div className="container mt-5">
      <h1>COURSE LIST</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Course name</th>
            <th scope="col">Skill level</th>
            <th scope="col">Details</th>
            <th scope="col">Faculty</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {courses ? (
          <tbody>
            {courses.map((course) => {
              // function deleteCourse(course._id) {}
              const deleteCourse = () => {
               
                adminDeleteCourse(course._id).then((response)=>{
                  if(response.status){
                    setCourse(response.data.coursedata)
                  }

                })
              };
             
              return (
                <tr key={course._id} >
                  <th scope="row">1</th>
                  <td>{course.coursename}</td>
                  <td>{course.skill}</td>
                  <td>{course.description}</td>
                  <td>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${course.image_url}`}
                      className="img-fluid"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                      alt=""
                    />
                  </td>
                  <td>
                    <button onClick={()=>{editCourse(course._id)}} className="editbutton">Edit</button>
                  </td>
                  <td>
                    <button onClick={deleteCourse} className="editbutton">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <p>"jhghjggg"</p>
        )}
      </table>
    </div>
  );
}

export default CourseList;
