import React, { useEffect, useState } from 'react'
import { adminsideUserList } from '../../../services/adminApi'
import {toast} from 'react-toastify'

function UserList() {

    const [users, setUsers] = useState()
 useEffect(()=>{
    adminsideUserList().then((response)=>{
        console.log(response.data);
        if(response.data.status){
            setUsers(response.data.users)
        }else{
   toast.error(response.data.message,{
    position :"top-centre"
   })
        }
    })
 },[])


  return (
    <div className='container mt-5'>
      
      <h1 className='mb-4'>USER LIST</h1>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Student name</th>
      <th scope="col">Email adress</th>
      <th scope="col"></th>
    </tr>
  </thead>
  {users&&<tbody>
    {
        users.map((user,index)=>(
    <tr>
      <th scope="row">{index+1}</th>
      <td>{user.firstName}</td>
      <td>{user.email}</td>
      <td><button className='button'>Block</button></td>

      {/* <td>@mdo</td> */}
    </tr>
   
        ))
}
  </tbody>}
</table>

    </div>
  )
}

export default UserList