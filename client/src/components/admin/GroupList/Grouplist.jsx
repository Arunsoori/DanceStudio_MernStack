import React from "react";
import { adminGroupList } from "../../../services/adminApi";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { adminDeleteGroup } from "../../../services/adminApi";
// import './facultylist.css'

function Grouplist() {
  const navigate = useNavigate();

  const [group, setGroup] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const limit = 2;

  useEffect(() => {
    adminGroupList(currentPage).then((response) => {
      console.log(response.data, "respnse group");
      if (response.data.status) {
        setGroup(response.data.groupdata);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        });
      }
    });
  }, [currentPage]);
  const openDeleteModal = (facultyId) => {
    setSelectedGroupId(facultyId);
    setModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedGroupId(null);
    setModalIsOpen(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const confirmDelete = () => {
    adminDeleteGroup(selectedGroupId).then((response) => {
      if (response.status) {
        // setGroup(response.data.groupdata);
    const updatedGroup =  group.map((gp)=>{
          if(gp._id === selectedGroupId ){
            gp=response.data.group
          }
          return gp;
        })
        setGroup(updatedGroup)
      } else {
        console.log("no data from faculty database");
      }
    });
    closeDeleteModal();
  };

  function EditGroup(groupId) {
    console.log(groupId, "in edit function");
    navigate(`/admin/editgroup/${groupId}`);
  }

  return (
    <div className="container mt-5">
      <h1>GROUP LIST</h1>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th scope="col">No</th>
            <th scope="col">Name of Group</th>
            <th scope="col">Description </th>
            {/* <th scope="col">Styles</th>
      <th scope="col">Image</th>
      <th scope="col ">Edit</th> */}
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>

          </tr>
        </thead>
        {group ? (
          <tbody>
            {group.map((group, index) => (
              <tr className={group.status ? `text-center ` : "text-center bg-danger"} key={group._id}>
                <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
                <td>{group.name}</td>
                <td>{group.description}</td>
                {/* <td>{faculty.styles}</td> */}
                {/* <td>{<img   src={`${process.env.REACT_APP_BASE_URL}/${faculty.image_url}`} alt=""  className="img-fluid"   style={{ maxWidth: '100px', maxHeight: '100px' }} />}</td> */}
                <td>
                  <button
                    onClick={() => {
                      EditGroup(group._id);
                    }}
                    className="editbutton"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      openDeleteModal(group._id);
                    }}
                    className="editbutton"
                  >
                   {group.status ? "Disable" : "enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p>"no groups "</p>
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
  );
}

export default Grouplist;
