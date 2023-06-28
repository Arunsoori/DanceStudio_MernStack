import React from "react";
import "./homepagebanner.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Homepagebanner() {
  const navigate = useNavigate();
  return (
   
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <div className="col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
          <div className="leftdiv">
            <h1 className="moves">Moves That Make Meanings</h1>
            <p className="oneplace mt-5">
              The one place for all your dance needs-now at your fingertips.
            </p>
            <p className="oneplace">A platfrom where dance eductaion meets fun</p>
            {/* <Link to={'/courses'}> */}
            <button
              className="bannerbutton mt-4"
              onClick={() => {
                navigate("/courses");
              }}
            >
              View classes
            </button>
            {/* </Link> */}
          </div>
        </div>
        <div className="col-md-6 col-sm-12 d-flex  justify-content-center align-items-center">
          <img
            src="/GRP-DANCE-min-fffinal.png"
            alt
            className="img-fluid mobile-height  " 
          />
        </div>
      </div>
    
  );
}

export default Homepagebanner;
