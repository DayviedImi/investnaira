import React from "react";
import "./Testimonials.css";
import Rec from "./Rec";
import Testimonies from "./Testimonies";
import Pattern from "../../assets/svg/Footer Patterns.svg";
import "pure-react-carousel/dist/react-carousel.es.css";

const Testimonials = () => {
  return (
    <div className="testimonials">
      <img className="pattern " src={Pattern} alt="pattern" />
      <div className="testContainer">
        <div className="test">
          <p className="Successtext1">Our Customers Love what we do</p>
          <p className="Successtext2">
            Don’t take our word for it. Here’s what our customers think.
          </p>
          {/* <Button style={{ display: "flex", justifyContent: "center" }}>
            <p className="successbuttontext"> Read our success stories</p>
          </Button> */}
        </div>
        <div className="recs">
          {Testimonies.map((item, index) => (
            <Rec key={index} text={item.text} name={item.name} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
