import React from "react";
import "../styles/SocialIcons.css";
import whatsapp from "../assets/whats.jpg"
import instagram from "../assets/insta.jpg"
import twitter from "../assets/twitter.jpg"

const SocialIcons = () => {
  return (
    <div className="social-bar">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">
        <img src={instagram} alt="instagram"/>
      </a>
      <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="icon whatsapp">
        <img src={whatsapp} alt="whatsapp"/>

      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">
               <img src={twitter} alt="twitter"/>

      </a>

    </div>
  );
};

export default SocialIcons;
