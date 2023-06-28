import React from 'react'
import Sidebar from '../../components/admin/sidebar/sidebar'
import AddCourse from '../../components/admin/addCourse/AddCourse'

function addCourse() {
  return (
    <div>
<Sidebar/>
<div className='ms-5'>
<AddCourse/>

</div>
    </div>
  )
}

export default addCourse