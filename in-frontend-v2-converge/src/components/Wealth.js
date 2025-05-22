import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

import Landing from "../assets/images/Landing.jpg";
import Google from "../assets/images/googleplaystore.png";
import { Button } from "./Button";
import "../assets/css/Wealth.css";

const Wealth = () => {
  return (
    <div className="wealth">
      <div className="flower">
        <img src={Landing} alt="splash" style={{ width: "90%" }} />
      </div>
      <div className="wealthContent">
        <div>
          <p className="text1">Build wealth steadily </p>
          <p className="text2">
            At InvestNaira, we help you
            <Link
              style={{ fontWeight: "bold", cursor: "pointer", color: "#4caf50" }}
              to="Save"
              smooth={true}
              offset={-20}
              duration={500}>
              {` SAVE`}
            </Link>
            ,
            <Link
              style={{ fontWeight: "bold", cursor: "pointer", color: "#4caf50" }}
              to="Invest"
              smooth={true}
              offset={-20}
              duration={500}>
              {` INVEST `}
            </Link>
            and
            <Link
              style={{ fontWeight: "bold", cursor: "pointer", color: "#4caf50" }}
              to="Compound"
              smooth={true}
              offset={-20}
              duration={500}>
              {` COMPOUND `}
            </Link>
            your wealth for the long-term.
          </p>
        </div>
        <div className="leftContent">
          <NavLink to="/signup">
            <Button className="txt startButton" title="START BUILDING TODAY" />
          </NavLink>
          <div className="storeButtons">
            <a href="https://play.google.com/store/apps/details?id=com.investnaira.investnaira">
              <img className="google" src={Google} alt="google" />
            </a>
            {/* <img className="apple" src={Apple} alt="apple" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wealth;
