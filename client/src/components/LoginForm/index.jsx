import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

 const onChangeEmail=event=>{
    setEmail(event.target.value)
}

const onChangePassword=event=>{
    setPassword(event.target.value)
}

  const renderEmailInputField = () => {

    return (
      <div className="input-container">
        <input
          type="email"
          placeholder="Email"
          className="input-element"
          value={email}
          onChange={onChangeEmail}
        />
        {emailError && <span className="error-msg">{emailError}</span>}
      </div>
    );
  };

 const renderPasswordInputField = () => {
    
    return (
      <div className="input-container">
        <input
          type="password"
          placeholder="Password"
          className="input-element"
          value={password}
          onChange={onChangePassword}
        />
        {passwordError && (
          <span className="error-msg">{passwordError}</span>
        )}
      </div>
    );
  };

  const validateFields = () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const isValid = validateFields();
    if (!isValid) {
      return; // Stop submission if validation fails
    }

    const userDetails = { email, password };
    const url = "http://localhost:3001/login/";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.jwtToken;
        localStorage.setItem("jwtToken", jwtToken);

        navigate("/home");
      } else {
        const errorData = await response.json();
        console.error("Error: ", errorData);
      }
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="main-container">
      <div className="inner-container">
      <form className="form-container" onSubmit={submitForm}>
        <h1 className="main-heading">Login</h1>
        {renderEmailInputField()}
        {renderPasswordInputField()}
        <div className="button-container">
        <button type="submit" className="button">
          Login
        </button>
        </div>
      </form>
    </div>
    </div> 
  );
};

export default LoginForm;
