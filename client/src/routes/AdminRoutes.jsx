import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LoginPage from '../pages/admin/login'


import Loginpage from '../components/login/Login'

function AdminRoutes() {
  return (
   <Routes>
    <Route path="/" element={<LoginPage/>} />
   </Routes>
  )
}

export default AdminRoutes