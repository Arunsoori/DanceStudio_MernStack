import React from 'react'
import './singlecoursepage.css'
import { useEffect, useState } from 'react'

import { FetchPackageAmount, singleCourseDetails } from '../../services/userApi'
import { useParams,Link, useNavigate } from 'react-router-dom'



function Singlecoursepage() {
  const {id} = useParams()

  const navigate = useNavigate()

  const [course, setCourse]= useState()
  const [selectedOption, setSelectedOption] = useState("")

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


 useEffect(()=>{
  singleCourseDetails(id).then((response)=>{
   
     if(response.status){
     setCourse(response.data.Singledetails)
     }else{
      
     }
  })



 },[])

    

 const handleButtonClick = () => {

  FetchPackageAmount( selectedOption,id )
    .then((response) => {
   
      if(response.status){
        navigate(`/purchase/${id}`)
      }
    })
    .catch((error) => {
    
      console.error(error);
    });
};



  function facultyDetails(facultyId){
  navigate(`/facultydetails/${facultyId}`)
}

  return (


    
     <div>
    
  
    {course && <div className="d-flex flex-column vh-100  container">
      
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
      <p>{course.skill}</p>
    </div>
  </div>
  <div>
      
    {/* <div className="dropdown-center mt-5 mb-5">
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Centered dropdown
      </button>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#">Action</a></li>
        <li><a className="dropdown-item" href="#">Action two</a></li>
        <li><a className="dropdown-item" href="#">Action three</a></li>
      </ul>
    </div> */}
   <div classname="container">
  <form>
    <div classname="mb-3">
      <h3>Select Course Package</h3>
      <div classname="form-check">
        <input classname="form-check-input" type="radio" value="one" name="option" id="option1"   checked={selectedOption === 'one'}
              onChange={handleOptionChange} defaultValue="option1" />
        <label classname="form-check-label" htmlfor="option1">
          one month 
        </label>
      </div>
      <div classname="form-check">
        <input classname="form-check-input" type="radio" value="six" name="option" id="option2"  checked={selectedOption === 'six'}
              onChange={handleOptionChange} defaultValue="option2" />
        <label classname="form-check-label" htmlfor="option2">
          six month
        </label>
      </div>
      <div classname="form-check">
        <input classname="form-check-input" type="radio" value="year"name="option" id="option3"  checked={selectedOption === 'year'}
              onChange={handleOptionChange} defaultValue="option3" />
        <label classname="form-check-label" htmlfor="option3">
          one year
        </label>
      </div>
    </div>
    <button type="button" onClick={handleButtonClick} classname="btn btn-primary">Go to purchse</button>
  </form>
</div>

    <div className="row mt-5 ms-5 ">
      
      <div onClick={()=>facultyDetails(course.facultyId._id)} className="col-6 col-md-3">
        <div className="card position-relative">
          <img src={`${process.env.REACT_APP_BASE_URL}/${course.facultyId.image_url}`} className="card-img-top" alt="Image" />
          <div className="card-body d-flex align-items-end justify-content-center">
            <h5 className="card-title position-absolute bottom-0  start-50  pb-2 translate-middle-x   py-1 bg-overlay">{course.facultyId.name}</h5>
          </div>
        </div>
      </div>
    
    </div>
  </div>

</div> }

</div>
  

  

  )
}

export default Singlecoursepage