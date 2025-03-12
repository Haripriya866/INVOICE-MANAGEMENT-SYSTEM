import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import './index.css';

const Register=()=>{
  const [name,setName]=useState("");
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError,setNameError]=useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

   const onChangeName=event=>{
      setName(event.target.value)
  }

  const onChangeEmail=event=>{
      setEmail(event.target.value)
  }

  const onChangePassword=event=>{
      setPassword(event.target.value)
  }

  const renderNameInputField = () => {
      return (
        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            className="input-element"
            value={name}
            onChange={onChangeName}
          />
          {nameError && <span className="error-msg">{nameError}</span>}
        </div>
      );
    };
  
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
  
      setNameError("");
      setEmailError("");
      setPasswordError("");
  
      if (!name) {
        setNameError("Name is required")
        isValid = false;
      }
      if (!email) {
        setEmailError("Email is required")
        isValid = false;
      }
      if (!password) {
        setPasswordError("Password is required")
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
  
      const userDetails = { name, email, password };
  
      const url = "https://invoice-management-system-api.vercel.app/";
  
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      
      try{
        const response=await fetch(url,options);
        if(response.ok===true){
          const data=await response.json()
          console.log(data);
          alert("Registration successful!");
          setName("");
          setEmail("");
          setPassword("");
        }
        else{
          const errorData=await response.json()
          console.error("Error: ",errorData)
        }

      }
      catch(error){
        console.log("Registeration failed: ",error)
      }
    };

  return(
    <div className='main-container'>  
    <div className='inner-container'>
        <form className="form-container" onSubmit={submitForm}>
            <h1 className="main-heading">Registration</h1>
            {renderNameInputField()}
            {renderEmailInputField()}
            {renderPasswordInputField()}
            <div className='button-container'>
              <button type="submit" className="button">
                  Signup
              </button>
            </div>
            <p className='register-para'>Already Have an Account</p>
            <Link to='/login/' className='login-link-style'>
              <div className="button-container">
                  <button className='button' type='button'>
                      Login
                  </button>
              </div>    
            </Link> 
        </form>
    </div>
    </div>
  )
}

export default Register