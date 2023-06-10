import React from 'react'

function Avatar() {
  return (
    <div>
            <label htmlFor="image">
        <div className='bg-dark ' style={{height:'100px', width:'100px'}} >
            
        <input id='image' type="file" className='d-none' />

        </div>
            </label>
    </div>
  )
}

export default Avatar