import React from "react";
import { useState, useEffect } from "react";
import { adminCourseList, adminDeleteCourse } from "../../../services/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./courselist.css";

function CourseList() {
  const [courses, setCourse] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate= useNavigate()

  useEffect(() => {
    adminCourseList(currentPage).then((response) => {
      console.log(response.data);
      if (response.data.status) {
        setCourse(response.data.coursedata);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(response.data.message, {
          position: "top-centre",
        });
      }
    });
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };


  function editCourse(courseId){
  
    navigate(`/admin/editcourse/${courseId}`)
  }

  return (
    <div className="container mt-5">
      <h1>COURSE LIST</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Course name</th>
            <th scope="col">Skill level</th>
            <th scope="col">Details</th>
            <th scope="col">Image</th>
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
      <div className="pagination-container">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CourseList;
