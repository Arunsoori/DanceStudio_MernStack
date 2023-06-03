import React from 'react'
import {Route, Routes} from 'react-router-dom'
import AdminLoginPage from '../pages/admin/login'
import Dashboard from "../pages/admin/dashboard"
import AdminAddCourse from '../pages/admin/addCourse'
import AddFaculty from '../pages/admin/addFaculty'
import UserList from '../pages/admin/userlist'
import CourseList from '../pages/admin/courseListPage'
import FacultyListPage from '../pages/admin/facultyList'

import Editcoursepage from '../pages/EditcoursePage/Editcoursepage'





function AdminRoutes() {
  return (
   <Routes>
    
    <Route path='/'element={<AdminLoginPage/>} />
    <Route path='/dashboard'element={<Dashboard/>} />
    <Route path='/addCourse'element={<AdminAddCourse/>} />
    <Route path='/addFaculty'element={<AddFaculty/>} />
    <Route path='/userList'element={<UserList/>}/>
    <Route path='/courseList'element={<CourseList/>}/>
    <Route path='/facultyList'element={<FacultyListPage/>}/>
    <Route path='/editcourse/:id'element={<Editcoursepage/>}/>








   </Routes>
  )
}

export default AdminRoutes