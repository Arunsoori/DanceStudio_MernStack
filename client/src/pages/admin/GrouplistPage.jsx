import React from 'react'
import Grouplist from '../../components/admin/GroupList/Grouplist'
import Sidebar from '../../components/admin/sidebar/sidebar'

function GrouplistPage() {
  return (
    <div>
      <Sidebar/>
      <Grouplist/>
    </div>
  )
}

export default GrouplistPage