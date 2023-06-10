import React from 'react'
import Profile from '../../components/Profile/Profile'
import UserNAvbar from '../../components/UserNavbar/UserNAvbar'
import UserFooter from '../../components/UserFooter/UserFooter'

function Profilepage() {
  return (
    <div>
        <UserNAvbar/>
        <Profile/>
        <UserFooter/>
    </div>
  )
}

export default Profilepage