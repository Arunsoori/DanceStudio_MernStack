import React from 'react'
import { useEffect,useState } from 'react'
import { orderDetails,orderCancel } from '../../../services/adminApi'
import './order.css'
import {toast} from 'react-toastify'
import Modal from 'react-modal'




function Order() {
  const [order,setOrder]= useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit=2
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  


    useEffect(()=>{
      orderDetails(currentPage).then((response)=>{
        console.log(response.data.order,"response");
        console.log(response.data.totalPages,"totalpage");

        if(response.data.status){
        setOrder(response.data.order)
        setTotalPages(response.data.totalPages)
    
        // console.log(order);

        }else{
          toast.error(response.data.message,{
            position: "top-center"
          })
        }
        
      
        

      })
    },[currentPage,order])

    const openCancelModal = (orderId) => {
      setSelectedOrderId(orderId);
      setModalIsOpen(true);
    };
  
    const closeDeleteModal = () => {
      setSelectedOrderId(null);
      setModalIsOpen(false);
    };
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
      
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
    // useEffect(() => {
    //   console.log(order,"order");
    // }, [order]);

    function confirmOrderCancel(){
    
      orderCancel(selectedOrderId).then((response)=>{
        console.log(response.data,"dataaaaaaaaaaaaaaaa");
        if(response.data.status){
        setOrder(response.data.order)


        }
     
      })
  closeDeleteModal();

             
         }
    
  return (
    <div className='container mt-5'>
      
       <h1 >ORDER LIST</h1>
      
        <table className="table">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Student Name</th>
      <th scope="col">Course Name</th>

      <th scope="col">Order Date</th>
      <th scope="col">Cancel Order</th>


    </tr>
  </thead>

  <tbody>
{order&&
    order.map((order,index)=>(
    <tr key={order._id}>
      
      <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
      <td>{order.userId&& order.userId.firstName}</td>
      <td>{order.courseId&&order.courseId.coursename}</td>
      <td>{new Date(order.orderdate).toLocaleDateString()}</td>
  {order.status&&
      <td><button onClick={()=>{openCancelModal(order._id)}} className='cancelbtn'>cancel</button></td>
  }
  {!order.status &&

      <td><button onClick={()=>{openCancelModal(order._id)}} className='cancelbtn'>cancelled</button></td>
  }
    </tr>
    ))
}
  </tbody>
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
        <p>Are you sure you want to delete this course?</p>

        <div className="modal-buttons">
          <button className="delete-button" onClick={confirmOrderCancel}>
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

export default Order