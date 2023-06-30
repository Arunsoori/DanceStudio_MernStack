import React, { useEffect } from 'react'
import { useState } from 'react'
import { EventFetch } from '../../services/userApi'
function Event() {
  const [eventp, setEvent] =useState()

    useEffect(()=>{
        EventFetch().then((response)=>{
            console.log(response.data.event,"event");
setEvent(response.data.event)

        })
    },[])
  return (
    <div className='vh-105 mb-5 container'>
      { eventp &&
      eventp.map((e)=>(

<img src={`${process.env.REACT_APP_BASE_URL}/${e.image_url}`} 
style={{ width: '100%', height: '100%', objectFit: 'cover' }}
key={e.id} alt="" />
      ))
}
    </div>
  )
}

export default Event