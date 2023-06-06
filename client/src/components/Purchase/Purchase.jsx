import React from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { packagePrice, singleCourseDetails } from '../../services/userApi'
import './purchase.css'

function Purchase() {
  const[purchase,setPurchase ] = useState()
  const[course, setCourse] = useState()
  const {id} = useParams()
  const navigate= useNavigate()

useEffect(()=>{
      packagePrice().then((response)=>{
              if(response.status){
                setPurchase(response.data.price)
              }
      })
 singleCourseDetails(id).then((response)=>{

  console.log(response.data.Singledetails,"single");
  if(response.status){
    setCourse(response.data.Singledetails)
  }
   
 })
    

},[])

function checkoutPage(){
  navigate(`/checkout/${id}`)
}

  return (
    <div>
        <div>
    
        { course &&
     <div className="d-flex flex-column vh-100  container">
        <div className='d-flex flex-column flex-md-row'>
     <div className='col lg-11'>
 <div className="mb-5 mt-5">
    <h1 className="fw-bold">{course.coursename}</h1>
    <p className="fs-5">{course.description}</p>
  </div>

  <div className="d-flex justify-content-between mb-5">
    <div>
      <p className="fs-5">duration </p>
      <p> 1 month</p>
    </div>
    <div>
      <p className="fs-5">Language </p>
      <p>English, Malayalam</p>
    </div>
    <div>
      <p className="fs-5">Skill level</p>
      <p></p>
    </div>
  </div>
  </div>
  <div className='col lg-1 d-flex align-items-center justify-content-center'>
 <div className="card text-center">
  
  <div className="card-body">
    <h5 className="card-title">₹ {purchase} </h5>
    <p className="card-text">1.5hr session</p>
    <p className="card-text"> monday's 9am to 11am </p>
    <button  onClick={checkoutPage} className="btn purchasebtn">Purchase</button>
  </div>
  
</div>

  </div>
  </div>

  <div>
      
    
    <div className="row mt-5 ms-5 ">
      <h2  style={{ color: '#227179' }}>know your faculty</h2>
      <Link to="/facultydetails">
      <div  className="col-6 col-md-3">
        <div className="card position-relative">
          <img src={`${process.env.REACT_APP_BASE_URL}/${course.facultyId.image_url}`} className="card-img-top" alt="Image" />
          <div className="card-body d-flex align-items-end justify-content-center">
            <h5 className="card-title position-absolute bottom-0  start-50  pb-2 translate-middle-x   py-1 bg-overlay">{course.facultyId.name}</h5>
          </div>
        </div>
      </div>
      </Link>
    </div>
  </div>


</div> 
}

</div>
    </div>
  )
}

export default Purchase