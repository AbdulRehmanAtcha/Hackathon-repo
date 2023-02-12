import React from "react";
import "./style.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="sign-main-box">
        <div className="sign-box">
          <img src={logo} alt="" />
          <form>
            <input type="text" placeholder="Full Name" minLength="3" required />
            <input type="email" placeholder="Email" required />
            <input
              type="tel"
              placeholder="Contact No."
              required
              minLength="11"
              maxLength="11"
            />
            <input type="password" placeholder="Password" required />
            <button>Register</button>
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
