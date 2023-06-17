import React from 'react'
import Sidebar from '../../components/admin/sidebar/sidebar'
import Chart from '../../components/admin/Chart/Chart'
import Piechart from '../../components/admin/Piechart/Piechart'
import DashboardBox from '../../components/admin/DashboardBox/DashboardBox'


function adminDashboard() {
  return (
    <div className='container'>
        <Sidebar/>
        <DashboardBox/>
        <div className="d-flex justify-content-between  align-items-center" >
          
     <div className='w-50'> <Chart /></div>
<div>      <Piechart/></div>
      
    </div>



    </div>
  )
}

export default adminDashboard