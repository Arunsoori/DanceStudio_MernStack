import './Facultydetails.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FetchFacultydetails } from '../../services/userApi'


function Facultydetails() {

    const {id}= useParams()
    const [faculty, setFaculty]= useState()


    useEffect(()=>{
       FetchFacultydetails(id).then((response)=>{
        console.log(response.data, "faculty data");
        if(response.data.status){
   setFaculty(response.data.facultydetails)
        }

        })

    },[])




  return (
    
  <div className='container'>
     {faculty &&
    <div className="row  ">
     <div className='d-flex align-items-center justify-content-center'>
    <div className='text-centre '>
<h1 className=''>{faculty.name}</h1>
    </div>
    </div>
    <div className="col-sm-12 col-md-6">
      <div className="card">
        <div className="card-body rounded-circle custom-rounded">
          <img src={`${process.env.REACT_APP_BASE_URL}/${faculty.image_url}`} className="card-img-top rounded-circle " alt="Profile" />
        </div>
      </div>
    </div>
    <div className="col-sm-12 col-md-6">
      <div className='my-3'>
       <i> <h4 className='mb-5 '>{faculty.position}</h4> </i>
        <h2 className='mb-5'>BIOGRAPHY</h2>
        <p className='mb-5 biography' style={{ fontSize: '20px' }}>{faculty.biography}</p>
        <h2 className='mb-5'>SKILLS</h2>
        <ul  className='my-3'>
            <li> <h5> {faculty.styles}</h5></li>
            <li> <h5>Choreography</h5></li>
            <li> <h5>Grooves</h5></li>

        </ul>
      </div>
    </div>

  </div>
  }
  </div>
   

  )
}

export default Facultydetails