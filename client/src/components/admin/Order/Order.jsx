import React from 'react'
import { useEffect,useState } from 'react'
import { orderDetails,orderCancel } from '../../../services/adminApi'
import './order.css'
import {toast} from 'react-toastify'



function Order() {
  const [order,setOrder]= useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit=2
  


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
    },[currentPage])
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
      
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
    // useEffect(() => {
    //   console.log(order,"order");
    // }, [order]);

    function handleOrderCancel(orderId){
      console.log(orderId,"id");
      orderCancel(orderId).then((response)=>{
        console.log(response.data,"dataaaaaaaaaaaaaaaa");
        if(response.data.status){
        setOrder(response.data.order)


        }
     
      })
             
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
      <td><button onClick={()=>{handleOrderCancel(order._id)}} className='cancelbtn'>cancel</button></td>
  }
  {!order.status &&

      <td><button onClick={()=>{handleOrderCancel(order._id)}} className='cancelbtn'>cancelled</button></td>
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

    </div>
  )
}

export default Order