import React, { useState, useEffect } from "react";
import "./style.css";
import cart from "../../images/shopping-cart.png";
import trolley from "../../images/trolley.jfif";
import axios from "axios";
import { Link } from "react-router-dom";
let baseURL = "";
if (window.location.href.split(":")[0] === "http") {
  baseURL = `http://localhost:5001`;
}

const Display = () => {
  axios.defaults.withCredentials = true;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [showing, setShowing] = useState(false);
  const [orderName ,setOrderName] = useState("");
  const [orderEmail ,setOrderEmail] = useState("");
  const [orderPhone ,setOrderPhone] = useState("");

  const allPosts = async () => {
    //   setLoading(true);

    try {
      // setLoading(false);
      const response = await axios.get(`${baseURL}/api/v1/products`);
      console.log("Got All Products", response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      // setLoading(false);
      console.log("Errorrrrr", error);
    }
  };
  useEffect(() => {
    allPosts();
    // console.log(state.user)
  }, []);

  //   const addingItem = (e)=>{
  //     setCartItems(cartItems + 1);
  //     setSavingLocal(e);
  //     window.localStorage.setItem("Items",e);
  //   }

  // const showCart = () => {
  //   setShowing(true);
  // };
  const addHandler = (e) => {
    setTotalPrice(totalPrice + Number(e.unitPrice));
    console.log(totalPrice);
    setCartItems(cartItems + 1);
  };

  const confirmOrder = (e) => {
    e.preventDefault();
    axios
      .post(`${baseURL}/api/v1/order`, {
        orderName: orderName,
        orderEmail: orderEmail,
        orderPhone: orderPhone,
        orderPrice:totalPrice,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("Error", err);
        // console.log(object)
      });
  };

  return (
    <>
      <div className="display-main">
        <div className="display-head">
          <h2 style={{ fontSize: "20px", textAlign: "center" }}>
            Sayalani Welfare <br />
            Discount Store
          </h2>
          <img
            src={trolley}
            alt="Trolley"
            style={{ height: "150px", width: "100%" }}
          />
        </div>
        <hr />
        <div className="categories"></div>
        {/* <br /> */}
        <div className="section">
          <hr />

          {products.map((eachProduct, i) => (
            <div className="single-post" key={i}>
              <img
                src={eachProduct?.pictureURL}
                style={{ width: "100px", height: "70%" }}
                alt="Product Pic"
              />
              <div className="name-price">
                <h2>{eachProduct?.name}</h2>
                <h3>Category: {eachProduct?.category}</h3>
                <p>
                  {eachProduct?.unitPrice}/per {eachProduct?.unitName}
                </p>
              </div>
              <button
                style={{ cursor: "pointer" }}
                onClick={() => {
                  addHandler(eachProduct);
                }}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
        <div className="footer">
          <div className="btn-group" role="group" aria-label="Basic example">
            <Link>
              <button type="button" className="btn btn-secondary">
                Home
              </button>
            </Link>
            <Link
              type="button"
              className="btn btn-dark"
              data-toggle="modal"
              data-target="#exampleModal"
              // onClick={showCart}
              style={{ background: "transparrent" }}
            >
              <button type="button" className="btn btn-secondary">
                <img src={cart} alt="cart" />
                <span className="badge badge-light">{cartItems}</span>
              </button>
            </Link>
            <button type="button" className="btn btn-secondary">
              Orders
            </button>
          </div>
        </div>
      </div>

      {/*  */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              your Product Total Price is :{totalPrice}
              <form>
                <input
                  type="text"
                  name="Name"
                  placeholder="NAME"
                  onChange={(e) => {
                    setOrderName(e.target.value);
                  }}
                />
                <input
                  type="email"
                  name="Email"
                  placeholder="EMAIL"
                  onChange={(e) => {
                    setOrderEmail(e.target.value);
                  }}
                />
                <input
                  type="tel"
                  name="Phone"
                  placeholder="PHONE"
                  onChange={(e) => {
                    setOrderPhone(e.target.value);
                  }}
                />
                {/* <input type="submit" value="Confirm Order" /> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirmOrder}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Display;
