import React from 'react'
import '../Chart/Chart'

function DashboardBox() {
  return (
    <div className='mb-5'>
        <div className="top-boxes">
        <div className="box" style={{ backgroundColor: 'red' }}>
          Box 1
        </div>
        <div className="box" style={{ backgroundColor: 'blue' }}>
          Box 2
        </div>
        <div className="box" style={{ backgroundColor: 'green' }}>
          Box 3
        </div>
        <div className="box" style={{ backgroundColor: 'yellow' }}>
          Box 4
        </div>
      </div>
    </div>
  )
}

export default DashboardBox