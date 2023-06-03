import React from 'react'
import { adminFacultyList } from '../../../services/adminApi'
import { useEffect} from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'

function FacultyList() {

  const [faculty,setFaculty]= useState()


 
  useEffect(()=>{
    adminFacultyList().then((response)=>{
      console.log(response.data,"respnse faculty");
      if(response.data.status){
         setFaculty(response.data.facultydata)
      }else{
        toast.error(response.data.message,{
          position: "top-center"
        })
      }
    })
  
  
  },[])



  return (
    <div className='container mt-5'>
       <h1 >FACULTY LIST</h1>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name of Faculty</th>
      <th scope="col">Position </th>
      <th scope="col">Styles</th>
      <th scope="col">Image</th>

    </tr>
  </thead>
  {faculty&&
  <tbody>
    { faculty.map((faculty)=>(
    <tr>
      <th scope="row">1</th>
      <td>{faculty.name}</td>
      <td>{faculty.position}</td>
      <td>{faculty.styles}</td>
      <td>{<img   src={`${process.env.REACT_APP_BASE_URL}/${faculty.image_url}`} alt=""  className="img-fluid"   style={{ maxWidth: '100px', maxHeight: '100px' }} />
   }</td>

    </tr>
    ))
}
  </tbody>}
</table>

    </div>
  )
}

export default FacultyList