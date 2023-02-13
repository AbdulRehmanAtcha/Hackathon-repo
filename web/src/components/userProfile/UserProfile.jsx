import React from "react";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import user from "../../images/programmer.png";
import axios from "axios";
import { GlobalContext } from "../../context/Context";
let baseURL = "";
if (window.location.href.split(":")[0] === "http") {
  baseURL = "http://localhost:5001";
}

const UserProfile = () => {
  axios.defaults.withCredentials = true;
  let { state, dispatch } = useContext(GlobalContext);
  const [allItems, setAllItems] = useState([]);
  const allProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/yourOrders`);
      //   console.log("Getting All Products Success", response.data);
      setAllItems(response.data.data);
      console.log(allItems);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    allProducts();
  }, []);

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
      <br />
      <br />
      <h2 style={{color:"aliceblue"}}>All your orders</h2>
      {allItems === null ? null : (
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((eachProduc, i) => (
              <tr key={i}>
                <td>{eachProduc?._id}</td>
                <td>{eachProduc?.orderName}</td>
                <td>{eachProduc?.orderEmail}</td>
                <td>{eachProduc?.orderPhone}</td>
                <td>PKR: {eachProduc?.orderPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserProfile;
