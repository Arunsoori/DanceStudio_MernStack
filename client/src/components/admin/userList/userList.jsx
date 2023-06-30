import React, { useEffect, useState } from 'react'
import { adminsideUserList } from '../../../services/adminApi'
import {toast} from 'react-toastify'
import { userBlock } from '../../../services/adminApi'
import './userlist.css'


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

 function blockUser(userId){
  try{
    console.log("block user called");
    userBlock(userId).then((response)=>{
      const updatedUser = users.map((user) => {
        if (user._id === userId) {
          user = response.data.user
        }
        return user;
      })
      setUsers(updatedUser)
    })
  

  }catch(error){

  }


 }


  return (
    <div className='container mt-5'>
      
      <h1 className='mb-4'>USER LIST</h1>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Student name</th>
      <th scope="col">Email adress</th>
      <th scope="col"></th>
    </tr>
  </thead>
  {users&&<tbody>
    {
        users.map((user,index)=>(
    <tr key={user._id}>
      <th scope="row">{index+1}</th>
      <td>{user.firstName}</td>
      <td>{user.email}</td>
      {!user.blockStatus&&
      <td><button  onClick={()=>{blockUser(user._id)}} className='blockbutton'>Block</button></td>
      }
      {user.blockStatus&&
      <td><button onClick={()=>{blockUser(user._id)}}  className='blockbutton'>UnBlock</button></td>
    }
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