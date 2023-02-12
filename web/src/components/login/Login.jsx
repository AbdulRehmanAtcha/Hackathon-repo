import React from "react";
import "./style.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="login-main-box">
        <div className="login-box">
          <img src={logo} alt="" />
          <form>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>LOGIN</button>
          </form>
          <h2 style={{fontSize:"20px", textAlign:"center"}}>Don't have An Account? <Link style={{color:"green"}} to="/signup"><span>Click Here</span></Link></h2>
        </div>
      </div>

      
    </>
  );
};

export default Login;
