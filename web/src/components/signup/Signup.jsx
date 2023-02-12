import React, { useState } from "react";
import axios from 'axios'
import "./style.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
let baseURL = "";
if (window.location.href.split(":")[0] === "http") {
  baseURL = "http://localhost:5001";
}

const Signup = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const registerHandler = (e) => {
    e.preventDefault();
    if (password === conPassword) {
      axios
        .post(`${baseURL}/api/v1/register`, {
          name: name,
          email: email,
          phone: phone,
          password: password
        })
        .then((response) => {
          if (response?.data?.keyPattern?.email === 1) {
            alert("This Email is already registered");
          } else if (
            response?.data?.message ===
            "Employee validation failed: name: Path `name` is required."
          ) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
      // console.log(gender);
    } else {
      alert("Password Did'nt Match");
    }
  };
  return (
    <>
      <div className="sign-main-box">
        <div className="sign-box">
          <img src={logo} alt="" />
          <form onSubmit={registerHandler}>
            <input type="text" name="name" placeholder="Full Name" minLength="3" required onChange={(e)=>{
              setName(e.target.value)
            }}/>
            <input type="email" name="email" placeholder="Email" required  onChange={(e)=>{
              setEmail(e.target.value)
            }}/>
            <input
            name="tel"
              type="tel"
              placeholder="Contact No."
              required
              minLength="11"
              maxLength="11"
              onChange={(e)=>{
                setPhone(e.target.value)
              }}
            />
            <input type="password" placeholder="Password" required onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
            <input type="password" placeholder="Confirm-Password" required onChange={(e)=>{
              setConPassword(e.target.value)
            }}/>
            <button type="submit" style={{cursor:"pointer"}}>Register</button>
            <h2 style={{fontSize:"20px", textAlign:"center"}}>
              Already Have An Account? <Link style={{color:"green"}} to='/login'><span>Login Here</span></Link>
            </h2>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
