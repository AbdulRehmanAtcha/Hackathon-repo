import React, { useState, useContext } from "react";
import axios from "axios";
import "./style.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/Context";
import { redirect } from "react-router-dom";

let baseURL = "";
if (window.location.href.split(":")[0] === "http") {
  baseURL = "http://localhost:5001";
}

const Login = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/api/v1/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "Admin login successful") {
        dispatch({
          type: "ADMIN_LOGIN",
          payload: response.data.profile,
        });
        redirect("/")
      } else if (response.data.message === "User login successful") {
        dispatch({
          type: "USER_LOGIN",
          payload: response.data.profile,
        });
        redirect("/")

      }
      if (response.data.message !== undefined) {
        alert(response.data.message);
      }
      // console.log(response)
      else if (response.data.message === undefined) {
        alert(response.data);
      }
      console.log(response.data.message)
      console.log(state)
      // alert(response.data.message);
    } catch {
      console.log("Error", e);
    }
  };

  return (
    <>
      <div className="login-main-box">
        <div className="login-box">
          <img src={logo} alt="" />
          <form onSubmit={loginHandler}>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
            />
            <button type="submit" style={{ cursor: "pointer" }}>
              LOGIN
            </button>
          </form>
          <h2 style={{ fontSize: "20px", textAlign: "center" }}>
            Don't have An Account?{" "}
            <Link style={{ color: "green" }} to="/signup">
              <span>Click Here</span>
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Login;
