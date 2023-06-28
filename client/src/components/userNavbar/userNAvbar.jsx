import React from "react";
import "./userNavbar.css";
import {useEffect } from "react";


import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../features/setUser";
import { Home } from "../../services/userApi";
import {toast} from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
import "./userNavbar.css"

function UserNAvbar() {

// const navigate = useNavigate()
const dispatch = useDispatch()
const navigate= useNavigate()
const user = useSelector((state) => state.user.value)


useEffect(()=>{
  Home().then((response)=>{
   
if(response.data.status){
  dispatch(setUserDetails(response.data.user))
}
if(response.data.loginfail){
  localStorage.removeItem("jwt")
}
  })
.catch((error)=>{
  toast(error.message)
})
},[])


function Logout(){
  localStorage.removeItem("jwt")
  dispatch(setUserDetails(null))
  navigate('/')
}
function handleAccountClick() {
  if (user) {
    navigate("/profile");
  }
}


  return (
 <div>
<nav className="navbar navbar-expand-lg bg-light  ">
  <div className="container-fluid">
    {/* <a className="navbar-brand" href="#"> */}
 <Link to={'/'}>
      <img  className="img-fluid logo me-5" src="../../..//download-final.png" alt="" />
 </Link>
    {/* </a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item nav-link active fw-bold  me-5">
          Home
        </li>
        <li className="nav-item nav-link fw-bold me-5">
          About
        </li>
        <li className="nav-item nav-link fw-bold me-5">
          Our Instructors
        </li>
        <li className="nav-item nav-link fw-bold me-5">
          Gallery
        </li>
        <li className="nav-item nav-link fw-bold me-5">
          Contact
        </li>
        <li className="nav-item nav-link fw-bold me-5">
          Faq
        </li>
        <li className="nav-item nav-link fw-bold me-5"  >
        <Link to='/chat' className="link-no-underline"  style={{ color: ' var(--bs-nav-link-color)' }}>
          Chat
        </Link>
        </li>
        <li className="nav-item nav-link fw-bold me-5"  >
        <Link to='/profile' className="link-no-underline"  style={{ color: ' var(--bs-nav-link-color)' }}>
          Account
        </Link>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle fw-bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a> */}
          {/* <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul> */}
        {/* </li> */}
       
      </ul>
      {/* <form className="d-flex" role="search"> */}
        
        {user ? <button className="btn btn-outline-success me-5 btn-lg" onClick={Logout} type="submit">Logout</button>: <button className="btn btn-outline-success me-5 btn-lg" onClick={()=>navigate("/login")} type="submit">Login</button>}
      {/* </form> */}
    </div>
  </div>
</nav>



</div>


  
  );
}

export default UserNAvbar;
