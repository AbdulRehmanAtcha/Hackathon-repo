import React from "react";
import "./style.css";
import user from "../../images/programmer.png";
import { Link } from "react-router-dom";

const Admin = () => {
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
        </div>
      </div>
    </>
  );
};

export default Admin;
