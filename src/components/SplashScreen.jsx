import React, { useEffect } from "react";
import "./SplashScreen.css";
import logo from "../assets/sp.jpg"
const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000); 
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <span className="emoji">
        <img src={logo} alt="logo" />
        </span>
   
      <h1 className="title">Food Fiesta</h1>
    </div>
  );
};

export default SplashScreen;
