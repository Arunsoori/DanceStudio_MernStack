import React, { useEffect } from "react";
import Password from "../Password/Password";
import Enrolledcourse from "../Enrolledcourse/Enrolledcourse";
import Avatar from "../Avatar/Avatar";
import { useState } from "react";
import { userDetails } from "../../services/userApi";

function Profile() {
  const [activeTab, setActiveTab] = useState("courseDetails");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    userDetails().then((response) => {
      console.log(response.data.user, "resp");
      setProfileImage(response.data.user.image_url);
    });
  }, []);

  const handleProfileImageChange = (imageSrc) => {
    console.log(imageSrc, "imgsrc");
    setProfileImage(imageSrc);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "courseDetails":
        return <Enrolledcourse />;
      case "editUserDetails":
        return <Password />;
      case "uploadProfilePicture":
        return <Avatar onProfileImageChange={handleProfileImageChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="container ">
      <div className="row ">
        <div
          className="d-flex align-items-center flex-column justify-content-center col-md-6 "
          style={{ height: "300px" }}
        >
          <div className="justify-content-center">
            <div
              className="rounded-circle bg-secondary"
              style={{
                width: "200px",
                height: "200px",
                backgroundImage: profileImage
                  ? `url(${process.env.REACT_APP_BASE_URL}/${encodeURIComponent(
                      profileImage
                    )})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="ml-3 ">
              <h2 className="mb-0 text-center">John Doe</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-between">
          <span onClick={() => setActiveTab("courseDetails")}> Course </span>
          <span onClick={() => setActiveTab("uploadProfilePicture")}>
            {" "}
            Avatar
          </span>

          <span onClick={() => setActiveTab("editUserDetails")}> Password</span>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-6 "></div>
        <div className="col-md-6   ">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default Profile;
