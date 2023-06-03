import React from "react";
import "./homepagebanner.css";
import { Link } from "react-router-dom";

function Homepagebanner() {
  return (
  <div className="container">
      <div className="d-flex flex-column flex-md-row">
   
      <div className="col-md-6 col-sm-12 ms-5 mt-5 ">
        <h1>MOVES THAT MAKE MEANINGS</h1>
        <p>AJHFDJHFAJDSHFHFKJASHFKJH</p>
        <p>hfadjshfjdsahfdjfhdakjfhkjahfa</p>
      <Link to={'/courses'}>
        <button className="button" >View classes</button>
      </Link>
      </div>
      <div className="col-md-6 col-sm-12 ">
      <img src="/images/home/bgremovedbanner.png" alt className="img-fluid mobile-height" />

      </div >
    </div>
  </div>
  );
}

export default Homepagebanner;
