import React from "react";
import "./style.css";
import { useContext } from "react";
import user from "../../images/programmer.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from '../../context/Context'
let baseURL = "";
if (window.location.href.split(":")[0] === "http") {
  baseURL = `http://localhost:5001`;
} 

const Admin = () => {
  axios.defaults.withCredentials = true
  let { state, dispatch } = useContext(GlobalContext);
  const logoutHandler = async () => {
    try {
      let response = await axios.post(`${baseURL}/api/v1/logout`, {
        withCredentials: true,
      });
      console.log("res", response);
      // dispatch({
      //   type: "USER_LOGOUT",
      // });
      dispatch({
        type: "ADMIN_LOGOUT",
      });
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return (
    <>
      <div className="admin-main">
        <div className="btn-group" role="group" aria-label="Basic example">
          <Link to="/adminProfile">
            {" "}
            <button type="button" className="btn btn-secondary">
              Profile
            </button>
          </Link>
          <Link to="/addProducts">
            <button type="button" className="btn btn-secondary">
              Add Products
            </button>
          </Link>
          <Link to="allOrders">
            <button type="button" className="btn btn-secondary">
              View Orders
            </button>
          </Link>
          <button
            onClick={logoutHandler}
            type="button"
            className="btn btn-secondary"
          >
            Logout Handler
          </button>
        </div>
      </div>
    </>
  );
};

export default Admin;
