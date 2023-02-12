import React from 'react'
import './style.css';
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';

const Splash = () => {
  return (
    <>
    <div className="splash-main">
      <div className="splash-box">
        <img src={logo} style={{width:"300px", height:"300px"}} alt="Saylani-Logo"/>
        <h2 style={{color:"green"}}>Saylani Welfare</h2>
        <br />
        <br />
        <h3 style={{color:"green"}}>Online Grocery Store</h3>
        <br />
        <br />
        <Link to="/login"><button style={{backgroundColor:"green", color:"aliceblue", width:"200px", height:"45px", border:"none", borderRadius:"5px", cursor:"pointer"}}>Get Started</button></Link>
      </div>
    </div>
    </>
  )
}

export default Splash
