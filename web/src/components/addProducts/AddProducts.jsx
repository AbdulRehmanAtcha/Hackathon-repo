import React, { useState } from "react";
import "./style.css";
import axios from "axios";
let baseURL = "";
if (window.location.href.split(":")[0] === "http") {
  baseURL = `http://localhost:5001`;
}
// import user from "../../images/programmer.png";
const AddProducts = () => {
  axios.defaults.withCredentials = true;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const addObj = {
    description: description,
    name:name,
    category:category,
    unitName:unitName,
    unitPrice:unitPrice
  };
  const AddHandler = (e) => {
    e.preventDefault();
    // console.log(description);
    var fileInput = document.getElementById("picture");
    // console.log("Post Piture: ", fileInput.files[0]);
    let formData = new FormData();
    formData.append("myFile", fileInput.files[0]);
    formData.append("description", addObj.description);
    formData.append("category", addObj.category);
    formData.append("unitName", addObj.unitName);
    formData.append("unitPrice", addObj.unitPrice);
    formData.append("name", addObj.name);
    axios({
      method: "post",
      url: `${baseURL}/api/v1/product`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("response: ", res.data);
        
      })
      .catch((err) => {
        
        console.log("error: ", err);
      });

    // axios
    //   .post(`${baseURL}/api/v1/product`, addObj)
    //   .then((response) => {
    //     setLoading(false);
    //     console.log("response: ", response.data);
    //     allPosts();
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log("error: ", err);
    //   });
  };
  return (
    <>
      <div className="add-main">
        <div className="add-box">
          <div className="profile-image"></div>
          <br />
          <br />
          <h2>Add New item</h2>
          <form onSubmit={AddHandler}>
            <input type="file" id="picture"/>
            <input type="text" placeholder="Item Name" onChange={(e)=>{
              setName(e.target.value)
            }}/>
            {/* <br /> */}
            {/* <br /> */}
            <input type="text" placeholder="Category" onChange={(e)=>{
              setCategory(e.target.value)
            }}/>
            {/* <br /> */}
            {/* <br /> */}
            <textarea
              cols="38"
              rows="4"
              placeholder="Describe This Product"
              onChange={(e)=>{
                setDescription(e.target.value)
              }}
            ></textarea>
            <input type="text" placeholder="Unit Name" onChange={(e)=>{
              setUnitName(e.target.value)
            }}/>
            <input type="text" placeholder="Unit Price" onChange={(e)=>{
              setUnitPrice(e.target.value)
            }}/>
            <input type="submit" value="ADD Product" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
