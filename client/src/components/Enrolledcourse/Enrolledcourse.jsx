import {useEffect,useState} from 'react'
import { userDetails } from '../../services/userApi'


function Enrolledcourse() {
  const [course, setCourse]= useState()
  useEffect(()=>{
    userDetails().then((response)=>{
      console.log(response.data.user.enrolledCouseId,"llll");
setCourse(response.data.user.enrolledCouseId)

    })

  },[])

  return (
    <div className='vh-100'>
      {course&&
      course.map((c)=>(
        <div className='coursename'>
            <h1>{c.coursename}</h1>
            <p>{c.description}</p>
        </div>
        ))}
    </div>
  )
}

export default Enrolledcourse