import {useEffect,useState} from 'react'
import { userDetails } from '../../services/userApi'


function Enrolledcourse() {
  const [course, setCourse]= useState([])
  useEffect(()=>{
    userDetails().then((response)=>{
     

      if(response.data.status){
        setCourse(response.data.user.enrolledCouseId)

      }

    })

  },[])

  return (
    <div className='vh-100'>
      {course.length > 0 ? (
        course.map((c) => (
          <div className="coursename" key={c.id}>
            <h1>{c.coursename}</h1>
            <p>{c.description}</p>
          </div>
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  )
}

export default Enrolledcourse