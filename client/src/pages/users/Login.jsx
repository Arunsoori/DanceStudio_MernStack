import React from "react";
import LoginPage from "../../components/login/Login";
import UserNAvbar from "../../components/UserNavbar/UserNAvbar";
import UserFooter from "../../components/UserFooter/UserFooter";

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
