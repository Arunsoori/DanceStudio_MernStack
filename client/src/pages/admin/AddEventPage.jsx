import React from 'react'
import Sidebar from '../../components/admin/sidebar/sidebar'
import AddEvent from '../../components/admin/AddEvent/AddEvent'
import { MdClass } from 'react-icons/md'

function AddEventPage() {
  return (
    <div>
        <Sidebar/>
        <AddEvent/>
    </div>
  )
}

export default AddEventPage