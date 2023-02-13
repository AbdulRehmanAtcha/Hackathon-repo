import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
let baseURL = "";
if (window.location.href.split(":")[0] === "http") {
  baseURL = "http://localhost:5001";
}

const AdminOrder = () => {
  axios.defaults.withCredentials = true;
  const [allItems, setAllItems] = useState([]);
  const allProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/allOrderAdmin`);
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
    <>
      hello Admin All Orders
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
                <td>${eachProduc?.orderPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AdminOrder;
