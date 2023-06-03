import React from 'react'
import Signup from '../../components/signup/Signup';
import UserNAvbar from "../../components/UserNavbar/UserNAvbar";
import UserFooter from "../../components/UserFooter/UserFooter";
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