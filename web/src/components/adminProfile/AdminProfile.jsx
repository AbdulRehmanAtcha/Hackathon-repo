import React from "react";
import { useContext } from "react";
import user from '../../images/programmer.png'
import "./style.css";
import axios from "axios";
import { GlobalContext } from "../../context/Context";

const AdminProfile = () => {
  axios.defaults.withCredentials = true;
  let { state, dispatch } = useContext(GlobalContext);
  return (
    <div className="admin-profile-main">
      <div className="profile-box">
        <div className="card">
          <img src={user} alt="John" style={{width:"10%", textAlign:"center"}} />
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
          <p className="title">ADMIN OF SAYALANI DISCOUNT STORE</p>
          <p>SMIT</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
