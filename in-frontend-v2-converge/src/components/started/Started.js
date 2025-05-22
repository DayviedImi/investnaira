import React from "react";
import Clock from "../../assets/images/Clock.png";
import "./Started.css";
import Form from "./Form";

function Started() {
  return (
    <div className="started">
      <p className="pageText">
        Get started in <br /> 1 minute
      </p>
      <div className="startedContent">
        <img className="clock" src={Clock} alt="clock" />
        <Form />
      </div>
    </div>
  );
}

export default Started;

