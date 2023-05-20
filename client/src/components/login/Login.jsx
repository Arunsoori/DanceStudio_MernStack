// import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';

import "./Login.css";

const Login = () => {
  // const [loginData, setLoginData] = useState({
  //   email: "",
  //   password: "",
  // });

  return (
    <>
      <div className="loginpage-container">
  <div className="loginpage">
    <div className="loginpage-image">
      <img src="../../..//signup_removed.png" alt="Signup" />
    </div>
    <div className="loginpage-form">
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div className="text-center">
          <button type="submit" className="btn btn-sm">Login</button>
        </div>
        <Link to={'/Signup'}>
        <p className="text-center mt-3">Don't have an account? <a href="">Register</a></p>
        </Link>
      </Form>
    </div>
  </div>
</div>

    </>
  );
};

export default Login;
