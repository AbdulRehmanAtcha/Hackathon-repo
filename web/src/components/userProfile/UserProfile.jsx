import React from "react";
import "./style.css";
import { useContext } from "react";
import user from "../../images/programmer.png";
import axios from "axios";
import { GlobalContext } from "../../context/Context";

const UserProfile = () => {
  axios.defaults.withCredentials = true;
  let { state, dispatch } = useContext(GlobalContext);
  return (
    <div className="user-profile-main">
      <div className="user-profile-box">
        <div className="card2">
          <img
            src={user}
            alt="USER"
            style={{ width: "10%", textAlign: "center" }}
          />
          <h1>
            {state?.user?.user?.name === undefined
              ? state?.user?.name
              : state?.user?.user?.name}
          </h1>
          <h2>
            {state?.user?.user?.email === undefined
              ? state?.user?.email
              : state?.user?.user?.email}
          </h2>
          <p className="title">User OF SAYALANI DISCOUNT STORE</p>
          <p>SMIT</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
