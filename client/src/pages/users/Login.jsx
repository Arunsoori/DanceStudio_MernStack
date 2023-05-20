import React from "react";
import LoginPage from "../../components/login/Login";
import UserNAvbar from "../../components/userNavbar/userNAvbar";
import UserFooter from "../../components/userFooter/userFooter";

function Login() {
  return (
    <div>
      <UserNAvbar />
      <LoginPage />
      <UserFooter />
    </div>
  );
}

export default Login;
