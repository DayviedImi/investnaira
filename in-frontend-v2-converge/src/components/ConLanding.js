import React from "react";

import { ReactComponent as Landing } from "../assets/svg/conLanding.svg";
import { Button } from "./Button";
import "../assets/css/conLanding.css";
import { Link } from "react-router-dom";

const ConLanding = () => {
  return (
    <div>
      <div className="conLanding">
        <div className="conLandingRight">
          <Landing className="conLander" />
        </div>
        <div className="conLandingRight">
          <p className="convergeFormHeader">
            Conver<span style={{ textDecoration: "none" }}>g</span>e
          </p>
          <p className="convergeFormSub">Now you can show your support in a way that matters</p>
          <p className="conLandingStart">Get started now</p>
          <Link to="/signup">
            <Button className="conButton" title="CREATE A CAMPAIGN" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ConLanding;
