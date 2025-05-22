import React from "react";
// import "./Mobile.css"
import styled from "styled-components";
import Screens from "../assets/images/Screens.png";
import Stores from "../assets/svg/Stores.svg";
import { generateMedia } from "styled-media-query";

const Mobile = () => {
  return (
    <MobileContainer>
      <div className="mobile">
        <img className="screens" src={Screens} alt="screens" />
        <div className="small-mobile">
          <p className="txt1">Get the InvestNaira app for your mobile device</p>
          <p className="txt2">
            Download our state of the art tool to help you grow your wealth steadily! Manage your
            wealth and investments in one place. Parents can monitor their kids’ spending and even
            help them prepare for their financial future.
          </p>
          <img className="stores" src={Stores} alt="stores" />
        </div>
      </div>
    </MobileContainer>
  );
};

export default Mobile;
const customMedia = generateMedia({
  phone: "414px",
});
const MobileContainer = styled.div`
  @import "../../assets/css/fonts.css";
  @import "../../App.css";

  .mobile {
    left: 0;
    height: 823px;
    opacity: 1;
    display: flex;
    align-items: center;
    z-index: -1;
    background-color: #4caf50;
    ${customMedia.lessThan("862px")`
align-items: flex-end;
height: 612px;
`}
  }
  .screens {
    width: 100%;
    position: absolute;
    left: -55px;
  }
  .small-mobile {
    left: 50%;
    text-align: left;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 550px;
    ${customMedia.lessThan("768px")`
height: 419px;
left: 0px;
top: -100px;
position: relative;
display: flex;
align-items: center;
text-align: center;

`}
  }
  .txt1 {
    width: 300px;
    height: 90px;
    font-family: AvenirNextCyr-Bold;
    color: #ffffff;
    text-align: left;
    font-size: 1.5em;
    ${customMedia.lessThan("768px")`
    width: 276px;
    height: 58px;
    font-size:24px;
    text-align: center
`}
  }
  .txt2 {
    margin-top: 0.5em;
    width: 350px;
    height: 158px;
    font-family: AvenirNextCyr-Medium;
    font-size: 1.2em;
    text-align: left;
    color: #ffffff;
    opacity: 1;
    letter-spacing: 0px;
    ${customMedia.lessThan("768px")`
width: 276px;
height: 148px;
font-size:14px;
text-align: center;
`}
  }
  .stores {
    margin-top: 47px;
    cursor: pointer;
    width: 80%;
    ${customMedia.lessThan("768px")`
margin-top: 1px;
height: 30px;
display: flex;
align-items: left;
text-align: left
`};
  }
`;
