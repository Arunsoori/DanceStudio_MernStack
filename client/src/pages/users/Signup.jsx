import React from 'react'
import Signup from '../../components/signup/Signup';
import UserNAvbar from "../../components/userNavbar/userNAvbar";
import UserFooter from "../../components/userFooter/userFooter";
function signup() {
  return (
    <div >
      <UserNAvbar/>
      <Signup/>
      <UserFooter/>
    </div>
  )
}

export default signup