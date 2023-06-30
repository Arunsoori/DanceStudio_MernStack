import React from 'react'
import { adminFacultyList ,adminDeleteFaculty} from '../../../services/adminApi'
import { useEffect} from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import './facultylist.css'

function FacultyList() {
  const navigate= useNavigate()

  const [faculty,setFaculty]= useState()
   const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const limit=2



 
  useEffect(()=>{
    adminFacultyList(currentPage).then((response)=>{
      console.log(response.data,"respnse faculty");
      if(response.data.status){
         setFaculty(response.data.facultydata)
        setTotalPages(response.data.totalPages);

      }else{
        // toast.error(response.data.message,{
        //   position: "top-center"
        // })
      }
    })
  
  
  },[currentPage])
  const openDeleteModal = (facultyId) => {
    setSelectedFacultyId(facultyId);
    setModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedFacultyId(null);
    setModalIsOpen(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const confirmDelete = () => {
       
    adminDeleteFaculty(selectedFacultyId).then((response)=>{
      if(response.status){
        console.log(response.data.facultydata);
        setFaculty(response.data.facultydata)

      }else{
        console.log("no data from faculty database");
      }

  
    })
    closeDeleteModal();
  
}



 function EditFaculty(facultyId){
  console.log(facultyId ,"in edit function");
  navigate(`/admin/editfaculty/${facultyId}`)
 }
 


  return (
    <div className='container mt-5'>
       <h1 >FACULTY LIST</h1>
        <table className="table">
  <thead>
    <tr className='text-center'>
      <th  scope="col">No</th>
      <th  scope="col">Name of Faculty</th>
      <th scope="col">Position </th>
      <th scope="col">Styles</th>
      <th scope="col">Image</th>
      <th scope="col ">Edit</th>
       <th scope="col">Delete</th>


    </tr>
  </thead>
  {faculty? (
  <tbody>
    { faculty.map((faculty, index)=>(


     
    
    <tr className='text-center'key={faculty._id}>
      
      <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
      <td>{faculty.name}</td>
      <td>{faculty.position}</td>
      <td>{faculty.styles}</td>
      <td>{<img   src={`${process.env.REACT_APP_BASE_URL}/${faculty.image_url}`} alt=""  className="img-fluid"   style={{ maxWidth: '100px', maxHeight: '100px' }} />}</td>
  <td>
    <button onClick={()=>{EditFaculty(faculty._id)}} className='editbutton'>Edit</button>
  </td>
  <td>
    <button onClick={() => {
                        openDeleteModal(faculty._id);
                      }} className='editbutton'>Delete</button>
  </td>
    </tr>
    
    ))
}
  </tbody>
  ) : (
          <p>no faculties </p>
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
        <p>Are you sure you want to delete this faculty member?</p>

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
  
  )
}

export default FacultyList