import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";

import Rec from "./Rec";
import Dami from "../assets/images/Girl2.png";
import Becca from "../assets/images/Girl1.png";
import Vic from "../assets/images/Boy.png";
import Pattern from "../assets/svg/Footer Patterns.svg";
import "../assets/css/Testimonials.css";

const Testimonials = () => {
  const Testimonies = [
    {
      text:
        "Thanks to my subscription with InvestNaira, I built a save-invest culture even before graduation",
      name: "Victor",
      image: Vic,
    },
    {
      text:
        "I plan to start a business upon graduation and InvestNaira has been a platform for me to invest towards this.",
      name: "Dami",
      image: Dami,
    },
    {
      text:
        "I observed that when I tried saving I always ended up spending it on nothing. Thanks to InvestNaira, I’m more financially disciplined and goal oriented.",
      name: "Rebecca",
      image: Becca,
    },
  ];
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
