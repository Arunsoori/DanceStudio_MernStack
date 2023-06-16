import React from 'react'
import Sidebar from '../../components/admin/sidebar/sidebar'
import Chart from '../../components/admin/Chart/Chart'

function adminDashboard() {
  return (
    <div>
        <Sidebar/>
        <Chart/>
    </div>
  )
}

export default adminDashboard