import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { packagePrice, singleCourseDetails } from '../../services/userApi'

function Purchase() {
  const[purchase,setPurchase ] = useState()
  const {id} = useParams()

useEffect(()=>{
      packagePrice().then((response)=>{
              if(response.status){
                setPurchase(response.data.price)
              }
      })
 singleCourseDetails(id).then((response)=>{
        console.log(response.data, "latest");
 })
    

},[])

  return (
    <div>
        <div>
    
  
     <div className="d-flex flex-column vh-100  container">
        <div className='d-flex flex-column flex-md-row'>
     <div className='col lg-11'>
  <div className="mb-5 mt-5">
    <h1 className="fw-bold">hghjjg</h1>
    <p className="fs-5">hjghj</p>
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
    <h5 className="card-title"> {purchase} </h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  
</div>

  </div>
  </div>

  <div>
      
    
    <div className="row mt-5 ms-5 ">
      <Link to="/facultydetails">
      <div  className="col-6 col-md-3">
        <div className="card position-relative">
          <img src="" className="card-img-top" alt="Image" />
          <div className="card-body d-flex align-items-end justify-content-center">
            <h5 className="card-title position-absolute bottom-0  start-50  pb-2 translate-middle-x   py-1 bg-overlay">name</h5>
          </div>
        </div>
      </div>
      </Link>
    </div>
  </div>

</div> 

</div>
    </div>
  )
}

export default Purchase