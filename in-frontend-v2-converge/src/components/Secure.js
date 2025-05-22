import React from "react";
import Security from "../assets/svg/Security.svg";
import "../assets/css/secure.css";

export default function Secure() {
  return (
    <div className="sec">
      <div className="secure" />
      <div className="secureContainer">
        <div className="security">
          <img className="security2" src={Security} alt="security" />
        </div>
        <div className="secureText">
          <p className="txt6">Your Account is Secure</p>
          <p className="txt7">
            With a 256 bit SSL Encryption, all online transactions are verified alongside 24/7
            technical support. You are in safe hands
          </p>
        </div>
      </div>
    </div>
  );
}
