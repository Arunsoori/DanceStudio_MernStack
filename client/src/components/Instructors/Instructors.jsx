import React, { useEffect } from 'react'
import './InstructorsPage.css'
import { Ourfaculties } from '../../services/userApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Instructors() {
    const [faculties, setFaculties] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        Ourfaculties().then((response)=>{
           if(response.data.status){
 setFaculties(response.data.facultydetails)


           }else{
            console.log("faculty details not getting");
           }
        })


    },[])

    function facultyDetails(facultyId){
        navigate(`/facultydetails/${facultyId}`)
      }
  return (
    <div>
        <div className='d-flex justify-content-center row text-center mb-5'>
       <h1 className='Instructors mb-5 mt-5'> Our Instructors</h1> 
        <p className='Dinstructors mb-5'>Our instructors are well trained by different artists around the globe. They make sure what they teach is proper and <br /> original. We are very much focused on building up a strong generation of enthusiastic dancers. Anyone who is a part of <br /> Thunderlines is treated like family and is taken care of.</p>
        </div>
        <div className='container'>
       <div className=" row row-cols-1 row-cols-md-3 g-4 ">
       {faculties&&  faculties.map((f)=>(
  <div className="col" key={f.id}>

    
    <div onClick={()=>facultyDetails(f._id)} className="card">
      <img src={`${process.env.REACT_APP_BASE_URL}/${f.image_url}`} className="card-img-top" alt="..." />
      <div className="card-body d-flex justify-content-center">
        <h5 className="card-title">{f.name}</h5>
      </div>
    </div>
 
  </div>
  )) }
  {/* <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div> */}
</div>

    </div>
    </div>
  )
}

export default Instructors