import axios from "axios";
import { useContext, useEffect } from "react";
import "./App.css";
import { GlobalContext } from "./context/Context";
// import User from "./components/user/User"; 
import Admin from "./components/admin/Admin";
import Signup from "./components/signup/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import Splash from "./components/splash/Splash";
import Login from "./components/login/Login";
import AdminProfile from "./components/adminProfile/AdminProfile";
import AddProducts from "./components/addProducts/AddProducts";
// import Orders from './components/orders/Orders'
import Display from "./components/display/Display";
import AdminOrder from "./components/adminOrder/AdminOrder";
import UserProfile from "./components/userProfile/UserProfile";
// import YourOrders from "./components/yourOrders/YourOrders";
// import Cart from "./components/cart/Cart";
let baseURL = "";

if (window.location.href.split(":")[0] === "http") {
  baseURL = "http://localhost:5001";
}

function App() {
  let { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    const getHome = async () => {
      try {
        let response = await axios.get(`${baseURL}/api/v1/profile`, {
          withCredentials: true,
        });
        // dispatch({
        //   type: "USER_LOGIN",
        //   payload: response.data,
        // });
        console.log(response);
        if (response.data.user.name === "Abdul Rehman Atcha") {
          dispatch({
            type: "ADMIN_LOGIN",
            payload: response.data,
          });
        } else {
          dispatch({
            type: "USER_LOGIN",
            payload: response.data,
          });
        }
        console.log(response);
      } catch (error) {
        console.log(error);
        console.log(state);
        dispatch({
          type: "USER_LOGOUT",
        });
        dispatch({
          type: "ADMIN_LOGOUT",
        });
      }
    };
    getHome();
  }, []);
  return (
    <>
        {state.isAdmin === true ? (
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/addProducts" element={<AddProducts />} />
          <Route path="/allOrders" element={<AdminOrder/>} />
          <Route path="*" element={<Admin />} />
        </Routes>
        ) : null}

        {state.isLogin === true &&
        (state.isAdmin === false || state.isAdmin === null) ? (
          <Routes>
            {/* <Route path="/" element={<User />} /> */}
            <Route path="/" element={<Display/>} />
            <Route path="/userProfile" element={<UserProfile/>} />
            {/* <Route path="/yourOrders" element={<YourOrders/>} /> */}
            {/* <Route path="/cart" element={<Cart/>} /> */}
            <Route path="*" element={<Display />} />
          </Routes>
        ) : null}

        {state.isAdmin === false && state.isLogin === false ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </Routes>
        ) : null}

        {state.isAdmin === null && state.isLogin === null ? (
          <Routes>
            <Route to='/' element={<Splash/>}/>
            <Route to='*' element={<Splash/>}/>
          </Routes>
        ) : null}
        
    </>
  );
}

export default App;
