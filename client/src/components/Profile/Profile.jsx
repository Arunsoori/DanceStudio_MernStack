import React from "react";
import Password from "../Password/Password";
import Enrolledcourse from "../Enrolledcourse/Enrolledcourse";
import Avatar from "../Avatar/Avatar";
import { useState } from "react";

function Profile() {
    const [activeTab, setActiveTab] = useState('courseDetails');

    const renderComponent = () => {
      switch (activeTab) {
        case 'courseDetails':
          return <Enrolledcourse />;
        case 'editUserDetails':
          return <Password />;
        case 'uploadProfilePicture':
          return <Avatar />;
        default:
          return null;
      }

    }

  return (
    <div className="container">
      <div className="row ">
        <div className="d-flex align-items-center flex-column col-md-6">
          <div
            className="rounded-circle bg-secondary"
            style={{ width: "100px", height: "100px" }}
          ></div>
          <div className="ml-3 ">
            <h2 className="mb-0">John Doe</h2>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-between">
          <span  onClick={()=>setActiveTab('courseDetails')} > Course </span>
          <span  onClick={()=>setActiveTab('editUserDetails')}> Avatar</span>

          <span onClick={()=>setActiveTab('uploadProfilePicture')}> Password</span>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-6 bg-primary">
            <h1>hgfh</h1>
        </div>
        <div className="col-md-6   ">
        {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
