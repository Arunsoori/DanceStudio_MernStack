import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LoginPage from '../pages/users/Login'
import SignupPage from '../pages/users/Signup'
import OtpPage from '../pages/users/OtpPage'


function UserRoutes() {
  return (
    <Routes>
        <Route path='/login'element={<LoginPage/>} />
       <Route path='/signup' element={<SignupPage/>} />


    </Routes>
    
)
}

export default UserRoutes