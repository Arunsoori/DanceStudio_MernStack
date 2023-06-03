import React from 'react'
import UserNAvbar from '../../components/UserNavbar/UserNAvbar'
import UserFooter from '../../components/UserFooter/UserFooter'
import Courses from '../../components/courses/Courses'
function coursesPage() {
  return (
    <div>
        <UserNAvbar/>
        <Courses/>
  <UserFooter/>

    </div>
  )
}

export default coursesPage