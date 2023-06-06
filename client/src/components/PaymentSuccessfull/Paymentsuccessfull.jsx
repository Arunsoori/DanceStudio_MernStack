import React from 'react'
import './payment.css'
import { Link } from 'react-router-dom'
function Paymentsuccessfull() {
  return (
    <div>
     <div className=' vh-100 d-flex align-items-center justify-content-center flex-column'>
     <h1> You Are Enrolled </h1>

     <Link to='/courses'>
     <button className='paybutton'>Go to Courses</button>
     </Link>
     </div>
     


    </div>
  )
}

export default Paymentsuccessfull