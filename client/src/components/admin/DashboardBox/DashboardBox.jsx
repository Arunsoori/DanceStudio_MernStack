import React from 'react'
import '../Chart/Chart'
import { useEffect, useState } from 'react'
import {  Findcount } from '../../../services/adminApi'
import { useNavigate } from 'react-router-dom'


function DashboardBox() {
 


  const [userCount, setUserCount] = useState('')
  const [orderCount, setOrderCount] = useState()
  const [courseCount,setCourseCount] = useState()
  const [facultyCount, setFacultyCount]= useState()


useEffect(()=>{
 
  Findcount().then((response)=>{
    console.log(response.data);
    setUserCount(response.data.userCount)
    setOrderCount(response.data.orderCount)
    setCourseCount(response.data.courseCount)
    setFacultyCount(response.data.facultyCount)


    

  })

},[])

  return (
    <div className='mb-5 '>
      {/* {userCount&& */}
        <div className="top-boxes ">
        <div className="box d-flex flex-column align-items-center mx-2  justify-content-center" style={{ backgroundColor: 'rgb(156 172 245)' }}>
  <p className="text-center mb-0">Total Students</p>
  <h3 className="text-center">{userCount}</h3>
</div>

<div className="box d-flex flex-column align-items-center mx-2 justify-content-center" style={{ backgroundColor:' rgb(255, 187, 40)' }}>
  <p className="text-center mb-0">Total Courses</p>
  <h3 className="text-center">{courseCount}</h3>
</div>
<div className="box d-flex flex-column align-items-center mx-2 justify-content-center" style={{ backgroundColor: 'rgb(0, 196, 159)' }}>
  <p className="text-center mb-0">Total Faculties</p>
  <h3 className="text-center">{facultyCount}</h3>
</div>
<div className="box d-flex flex-column align-items-center mx-2 justify-content-center" style={{ backgroundColor: 'rgb(255, 128, 66)' }}>
  <p className="text-center mb-0">Total Orders</p>
  <h3 className="text-center">{orderCount}</h3>
</div>

      </div>
{/* } */}
    </div>
  )
}

export default DashboardBox