import React from 'react'
import UserNAvbar from '../components/UserNavbar/UserNAvbar'
import UserFooter from '../components/UserFooter/UserFooter'
import Purchase from '../components/Purchase/Purchase'

function PurchasePage() {
  return (
    <div>
        <UserNAvbar/>
        <Purchase/>
        <UserFooter/>
    </div>
  )
}

export default PurchasePage