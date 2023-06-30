import {useEffect,useState} from 'react'
import {activeOrders} from '../../services/userApi'



function Enrolledcourse() {
  const [course, setCourse]= useState([])
  useEffect(()=>{
    activeOrders().then((response)=>{
      console.log(response.data,"response in enrolled");
     

      if(response.data.status){
        setCourse(response.data.courses)

      }

    })

  },[])

  return (
    <div className='vh-100'>
      {course.length > 0 ? (
        course.map((c) => (
          <div className="coursename" key={c.id}>
            <h1>{c.courseId.coursename}</h1>
            <p>{c.courseId.description}</p>
          </div>
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  )
}

export default Enrolledcourse