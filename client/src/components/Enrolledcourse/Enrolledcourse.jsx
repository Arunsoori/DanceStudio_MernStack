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
      <div className="row">
        {course.map((c, index) => (
          <div className="col-sm-6" key={c.id}>
            <div className="card">
              <div className="card-body">
                <p>Enrolled course{index+1}</p>
                <h1 className="card-title">{c.courseId.coursename}</h1>
                <p className="card-text">{c.courseId.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No courses available.</p>
    )}
  </div>
  
  )
}

export default Enrolledcourse