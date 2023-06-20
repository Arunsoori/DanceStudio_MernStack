import React from "react";
import { useState, useEffect } from "react";
import { adminCourseList, adminDeleteCourse } from "../../../services/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal'


import "./courselist.css";

function CourseList() {
  const [courses, setCourse] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate= useNavigate()
  const limit=2


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
  const openDeleteModal = (courseId) => {
    setSelectedCourseId(courseId);
    setModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedCourseId(null);
    setModalIsOpen(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
// function deleteCourse(course._id) {}
const confirmDelete = () => {
               
  adminDeleteCourse(selectedCourseId).then((response)=>{
    if(response.status){
      setCourse(response.data.coursedata)
    }else{
      console.log("no courses in database");
    }

  })
  closeDeleteModal();
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
            {courses.map((course, index) => (
              
             
            
                <tr key={course._id} >
                  <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
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
                    <button onClick={()=>{openDeleteModal(course._id)}} className="editbutton">
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
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
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeDeleteModal}
        className="delete-modal"
        overlayClassName="delete-modal-overlay"
        ariaHideApp={false}
      >
        <h2>Confirmation</h2>
        <p>Are you sure you want to delete this course?</p>

        <div className="modal-buttons">
          <button className="delete-button" onClick={confirmDelete}>
            Confirm
          </button>
          <button className="cancel-button" onClick={closeDeleteModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CourseList;
