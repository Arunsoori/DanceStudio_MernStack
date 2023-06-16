import React from "react";
import "./homepagebanner.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Homepagebanner() {
  const navigate = useNavigate();
  return (
    <div className=" vh-100  ">
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <div className="col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
          <div>
            <h1>MOVES THAT MAKE MEANING</h1>
            <p>
              The one place for all your dance needs-now at your fingertips.
            </p>
            <p>A platfrom where dance eductaion meets fun</p>
            {/* <Link to={'/courses'}> */}
            <button
              className="button"
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
            src="/images/home/bgremovedbanner.png"
            alt
            className="img-fluid mobile-height " 
          />
        </div>
      </div>
    </div>
  );
}

export default Homepagebanner;
