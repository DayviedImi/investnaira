import React from "react";
import { GoQuote } from "react-icons/go";

const Rec = (props) => {
  return (
    <div>
      <div className="rec">
        <div className="small-rec">
          <GoQuote size={25} color="#4CAF50" className="icon" marginLeft="37px" />
          <p className="testimonialText">{props.text}</p>
          <p className="name">{props.name}</p>
          <img className="testImage" src={props.image} alt={props.image} />
        </div>
      </div>
    </div>
  );
};

export default Rec;
