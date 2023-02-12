// import logo from './logo.svg';
import './App.css';
import Signup from './components/signup/Signup';
import {
  Route, Routes
} from "react-router-dom";
import Splash from './components/splash/Splash';
import Login from './components/login/Login';

function App() {
  return (
    <>
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <Splash/> */}
      <Routes>
        <Route path="/" element={<Splash/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  );
}

export default App;
