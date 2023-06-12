import React from 'react'
import { useEffect,useState } from 'react'
import { orderDetails,orderCancel } from '../../../services/adminApi'
import './order.css'


function Order() {
  const [order,setOrder]= useState()

    useEffect(()=>{
      orderDetails().then((response)=>{
        console.log(response.data.order,"response");
        if(response.data.status){
        setOrder(response.data.order)
        // console.log(order);

        }
        
      
        

      })
    },[])
    useEffect(() => {
      console.log(order,"order");
    }, [order]);

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
      
      <th scope="row">{index+1}</th>
      <td>{order.userId.firstName}</td>
      <td>{order.courseId.coursename}</td>
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

    </div>
  )
}

export default Order