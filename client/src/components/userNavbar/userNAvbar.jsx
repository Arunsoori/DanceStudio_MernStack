import React from "react";
import "./userNavbar.css";

function UserNAvbar() {
  return (
 <div>
<nav className="navbar navbar-expand-lg bg-light  ">
  <div className="container-fluid">
    {/* <a className="navbar-brand" href="#"> */}
    
      <img className="img-fluid logo me-5" src="../../..//download-final.png" alt="" />
    
    {/* </a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item">
          <a className="nav-link active fw-bold  me-5" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link fw-bold me-5 " href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link fw-bold me-5" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link fw-bold me-5" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link fw-bold me-5" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link fw-bold me-5" href="#">About</a>
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
        
        <button className="btn btn-outline-success me-5 btn-lg" type="submit">View Class</button>
      {/* </form> */}
    </div>
  </div>
</nav>



</div>


  
  );
}

export default UserNAvbar;
