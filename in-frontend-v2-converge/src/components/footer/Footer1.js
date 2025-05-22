import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { generateMedia } from "styled-media-query";

import * as authActions from "../../store/actions/auth";
const emailRegex = /^\S+@\S+\.\S+$/i;

const Footer1 = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("data", data);
    setIsLoading(true);
    try {
      const response = await dispatch(authActions.emailSubscribe(data));
      setIsLoading(false);
      alert(response.msg);
    } catch (err) {
      alert(err.message);
      setIsLoading(false);
    }
  };
  return (
    <Footer1Container>
      <div className="footer">
        <div className="col1">
          <h1 className="foottext">Subscribe to InvestNaira via Email</h1>
          <h2 className="foottext2">Enter your Email Address to receive our monthly newsletters</h2>
          <form className="subscribe" id="ftrEmailForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              className={errors.email ? "input-error inputEmail" : "inputEmail"}
              type="email"
              name="email"
              placeholder="invest@investnaira.com"
              ref={register({ required: true, pattern: emailRegex })}
              required
            />

            <input
              type="submit"
              className="button"
              value={isLoading ? "Subscribing..." : "SUBSCRIBE"}
            />
          </form>
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div className="col2">
            <ul>
              <li> +234-905-166-7728</li>
              <li> invest@investnaira.com</li>
              <li> No 16 Emmanuel Kolawole</li>
              <li> Street, Igbobi, Lagos.</li>
            </ul>
          </div>
          <div className="footerCol">
            <div className="col3">
              <ul>
                <li>
                  <Link
                    style={{ cursor: "pointer" }}
                    to="calculator"
                    smooth={true}
                    offset={-5}
                    duration={500}>
                    Calculator
                  </Link>
                </li>
                <li>
                  <a
                    style={{ color: "#999999" }}
                    href="https://nairasense.investnaira.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    NairaSense
                  </a>
                </li>
              </ul>
            </div>
            <div className="col4">
              <ul>
                <li>
                  <NavLink to="/vision" style={{ color: "#999999" }}>
                    Vision
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq" style={{ color: "#999999" }}>
                    FAQs
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Footer1Container>
  );
};

export default Footer1;
const customMedia = generateMedia({
  phone: "414px",
});
const Footer1Container = styled.div`
  input::placeholder {
    color: #cccccc;
  }
  input .button {
    color: #4caf50;
    padding-left: 19px;
  }
  @import "../../assets/css/fonts.css";
  @import "../../../src/App.css";

  .footer {
    width: 100%;
    height: 252px;
    background: #f8f8f8 0% 0% no-repeat padding-box;
    opacity: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 30px;
    ${customMedia.lessThan("968px")`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: space-between;
    
    `}
  }
  .footerCol {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    ${customMedia.lessThan("968px")`
      align-items: center;
      text-align: center; 
      width: 70%;
    justify-content: space-between;

    `};
  }

  /* column2 */
  .col2 {
    list-style: none;
    list-style-type: none;
    // width: 175px;
    height: 96px;
    text-align: left;
    font-size: 14px;
    letter-spacing: 0px;
    ${customMedia.lessThan("968px")`
margin-top:5px;
font-size: 10px;
color: #4CAF50;
width: 174px;
height: 96px;
`}
  }
  .footer .col2 ul {
    list-style-type: none;
    font: AvenirNextCyr-Medium;
    text-align: left;
    font-size: 14px;
    letter-spacing: 0px;
    color: #999999;
    opacity: 1;
    ${customMedia.lessThan("968px")`
text-align:center;
width: 100%;
position: relative;
left: -50px;


`}
  }

  /* column3 */
  .col3 {
    list-style: none;
    list-style-type: none;
    width: 75px;
    height: 98px;
    margin-right: 20px;
    ${customMedia.lessThan("phone")`

 font-size: 10px;
 width: 75px;
 height: 98px;
 `}
  }
  .footer .col3 ul {
    list-style-type: none;
    font: AvenirNextCyr-Medium;

    text-align: left;
    font-size: 14px;
    letter-spacing: 0px;
    color: #999999;
    opacity: 1;
    ${customMedia.lessThan("phone")`
color: #4CAF50;

`}
  }
  .footer .col3 ul li {
    margin-top: 10px;
  }

  /* column4 */
  .col4 {
    list-style: none;
    position: relative;
    list-style-type: none;
    width: 175px;
    height: 96px;
    text-align: left;
    font-size: 14px;
    letter-spacing: 0px;
    ${customMedia.lessThan("phone")`

margin-top:30px;
font-size: 10px;
width: 83px;
height: 72px;
`}
  }
  .footer .col4 ul {
    list-style-type: none;
    font: AvenirNextCyr-Medium;
    text-align: left;
    font-size: 14px;
    letter-spacing: 0px;
    color: #999999;
    opacity: 1;
    ${customMedia.lessThan("phone")`
color: #4CAF50;

`}
  }
  .footer .col4 ul li {
    margin-top: 10px;
  }

  .col1 {
    margin-left: 6em;
    width: 40%;
    ${customMedia.lessThan("968px")`
    display: none;
    
    `}
  }

  .footer .col1 ul {
    list-style-type: none;
  }

  .footer .col1 ul li {
    color: #999999;
    font-size: 14px;
    font-family: inherit;
    font-weight: bold;
    padding: 5px 0px 5px 0px;
    cursor: pointer;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
  }

  .foottext {
    height: 18px;
    font: AvenirNextCyr-Bold;
    text-align: left;
    font-size: 14px;
    letter-spacing: 0px;
    color: #4caf50;
    opacity: 1;
    ${customMedia.lessThan("phone")`
   
  
    font-size: 10px;
    `}
  }
  .foottext2 {
    height: 40px;
    font: AvenirNextCyr-Regular;

    text-align: left;
    font-size: 14px;
    letter-spacing: 0px;
    color: #999999;
    ${customMedia.lessThan("phone")`

`}
  }
  .inputEmail {
    width: 210px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #4caf50;
    border-radius: 4px;
    opacity: 1;
    color: #707070;
  }

  .button {
    margin-left: 20px;
    color: #ffffff;
    border: none;
    width: 120px;
    height: 40px;
    background: #4caf30;
    border-radius: 4px;
    opacity: 1;
  }
`;
