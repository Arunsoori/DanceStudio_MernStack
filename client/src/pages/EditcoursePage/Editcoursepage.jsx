import React from 'react'
import Editcourse from '../../components/admin/EditCourse/Editcourse'
import Sidebar from '../../components/admin/sidebar/sidebar'


function Editcoursepage(Id) {
  return (
    <div>
      <Sidebar/>
        <Editcourse/>
    </div>
  )
}

export default Editcoursepage