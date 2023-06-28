import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LoginPage from '../pages/users/Login'
import SignupPage from '../pages/users/Signup'
import OtpPage from '../pages/users/OtpPage'
import HomePage from '../pages/users/home'
import CoursesPage from '../pages/users/coursesPage'
import Singlecoursepage from '../pages/users/singlecoursepage'
import Facultydetailspage from '../pages/users/facultydetailspage'
import PurchasePage from '../pages/PurchasePage'
import CheckoutPage from '../pages/CheckoutPage'
import Paymentsuccessfullpage from '../pages/users/Paymentsuccessfullpage'
import Profilepage from '../pages/users/profilepage'
import Chatpage from '../pages/admin/Chatpage'





function UserRoutes() {
  return (
    <Routes>
        <Route path='/login'element={<LoginPage/>} />
       <Route path='/signup' element={<SignupPage/>} />
       <Route path='/otp' element={<OtpPage/>} />
       <Route path='/' element={<HomePage/>} />
       <Route path='/courses' element={<CoursesPage/>} />
       <Route path='/singlepage/:id' element={<Singlecoursepage/>} />
       <Route path='/facultydetails/:id' element={<Facultydetailspage/>} />
       <Route path='/purchase/:id' element={<PurchasePage/>} />
       <Route path='/checkout/:id' element={<CheckoutPage/>} />
       <Route path='/paymentsuccessfull' element={<Paymentsuccessfullpage/>} />
       <Route path='/profile' element={<Profilepage />} />
       <Route path='/chat' element={<Chatpage />} />

       



   



     








    </Routes>
    
)
}

export default UserRoutes