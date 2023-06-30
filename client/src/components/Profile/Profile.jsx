import React, { useEffect } from "react";
import Password from "../Password/Password";
import Enrolledcourse from "../Enrolledcourse/Enrolledcourse";
import Avatar from "../Avatar/Avatar";
import { useState } from "react";
import { userDetails } from "../../services/userApi";
import EditDetails from "../EditDetails/EditDetails";
import { useNavigate } from "react-router-dom";

function Profile() {

  const [activeTab, setActiveTab] = useState("courseDetails");
  const [profileImage, setProfileImage] = useState(null);
  const [name,setName] = useState() 
  const defaultAvatarImage = "/Profile_avatar_placeholder_large.png";
  const navigate = useNavigate()

  useEffect(() => {
    userDetails().then((response) => {
      console.log(response.data.user, "resp");
      console.log(response.data.status);
      if(response.data.status){
        setProfileImage(response.data.user.image_url);
        setName(response.data.user.firstName)

      }else{
   navigate('/login')
      }
   
    });
  }, [activeTab]);

  const handleProfileImageChange = (imageSrc) => {
    console.log(imageSrc, "imgsrc");
    setProfileImage(imageSrc);
  };
  const handleEditDetails = () => {
    setActiveTab("courseDetails");
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "courseDetails":
        return <Enrolledcourse />;
      case "editUserDetails":
        return <Password />;
      case "uploadProfilePicture":
        return <Avatar onProfileImageChange={handleProfileImageChange} />;
        case "editDetails":
          return <EditDetails setActiveTab={handleEditDetails} />;
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
              className="rounded-circle bg-secondary mt-5"
              style={{
                width: "200px",
                height: "200px",
                
                backgroundImage: profileImage
                  ? `url(${process.env.REACT_APP_BASE_URL}/${encodeURIComponent(
                      profileImage 
                    )})`  : `url(${defaultAvatarImage})`,
                  
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>


{name && name.length>0 ?(
            <div className="ml-3 ">
              <h2 className="mb-0 text-center">{name}</h2>
            </div>
):(
  <h2 className="mb-0 text-center">update profile</h2>

)
}
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-between">
          <span  className="profilesubheading" onClick={() => setActiveTab("courseDetails")}>Enrolled courses </span>
          <span className="profilesubheading" onClick={() => setActiveTab("uploadProfilePicture")}>
            Avatar
          </span>
          <span className="profilesubheading" onClick={() => setActiveTab("editDetails")}> Details</span>

          <span className="profilesubheading" onClick={() => setActiveTab("editUserDetails")}> Password</span>
        </div>
      </div>
      <div className="row ">
      <div className="col-md-6"></div>

        <div className="col-md-6">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default Profile;
