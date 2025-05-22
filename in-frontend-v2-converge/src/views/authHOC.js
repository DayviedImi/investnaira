import React from "react";

import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import Nav from "../components/Navbar/Navbar";
import Navbar from "../components/Navbar";

export default function AuthHOC(props) {
  return (
    <div>
      {props.open ? null : (
        <div>
          <Nav back={props.back} isModalOpen={props.isModalOpen} logout={props.logout} />
          <Navbar back={props.back} isModalOpen={props.isModalOpen} logout={props.logout} />
        </div>
      )}
      <div className="authContainer">
        <FormContainer>
          <h1 className="formHeader">{props.header}</h1>
          {props.children}
        </FormContainer>
      </div>
    </div>
  );
}

const customMedia = generateMedia({
  phone: "414px",
});

const FormContainer = styled.div`
  @import "../../assets/css/fonts.css";
  @import "../../App.css";

  input::placeholder {
    color: #cccccc;
  }

  text-align: center;

  form {
    display: flex;
    justify-content: center;
    align-items: center !important;
    flex-direction: column;
  }
  .startedText {
    margin: 20px 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    ${customMedia.lessThan("phone")`
        // font-size:10px;
        // width: 100%;
        // height: 13px;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // text-align: left;
    `};
  }
  .form-container {
    width: 529px;
    height: 580px;
    ${customMedia.lessThan("phone")`
        // margin-right: 0;
        // width:327px;
    `}
  }
  .labels {
    margin: 30px 0;
    padding-left: 0;
    margin-left: 0;
    text-align: left;
    height: 18px;
    font-size: 14px;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
    font-family: "AvenirNextCyr-Medium";
  }

  input:focus::placeholder {
    color: transparent;
  }
  .input-container {
    display: grid;
    text-align: center;
    grid-template-columns: 1fr;
    ${customMedia.lessThan("phone")`
        margin-right:0;
    `}
  }
  .input-empty {
    color: #cccccc;
    background: #f5fbf6;
    width: 529px;
    height: 60px;
    border: 0;
    border-radius: 5px;
    opacity: 1;
    border: 1px solid var(--unnamed-color-b3b3b347);
    padding: 0.9rem 1.25rem 0;
    position: relative;
    ${customMedia.lessThan("phone")`
        margin:0;
        width: 327px;
        height: 47px;
    `}
  }
  .placeholder {
    padding-left: 20px;
    font-family: "AvenirNextCyr-Bold";
    font-size: 18px;
    text-align: center;
    letter-spacing: 0px;
    color: #cccccc;
  }
  form div label {
    color: #0e1111;
    font-size: 1rem;
  }
  form div {
    position: relative;
    display: flex;
  }
  input:focus ~ label {
    font-size: 0.7rem;
  }
  input:focus {
    outline: none;
  }
  .input-error {
    border-bottom: 1px solid #db7302;
  }

  .checkbox-container input {
    border: 1px solid #707070;
    border-radius: 5px;
    opacity: 1;
    width: 20px;
    height: 20px;
    ${customMedia.lessThan("phone")`
        margin-left:-300px;
        width: 18px;
        height: 18px;  
     `}
  }

  .checkbox-container {
    color: #707070;
    font-size: 18px;
    cursor: pointer;
    font-family: "AvenirNextCyr-Medium";
    text-align: center;
    font-size: 18px;
    letter-spacing: 0px;
    opacity: 1;
    ${customMedia.lessThan("phone")`
        margin-left:30px;
        text-align: center;
        font-size:14px;
    `}
  }
  .bottomForm {
    width: 424px;
    height: 52px;
    font-family: "AvenirNextCyr-Regular";
    font-size: 18px;
    text-align: center;
    letter-spacing: 0px;
    color: #cccccc;
    ${customMedia.lessThan("phone")`
        width: 330px;
        height: 48px;
        font-size:14px;
        margin-left: 10px;
    `}
  }
  .under {
    text-decoration: underline;
  }

  .button {
    width: 402px;
    height: 60px;
    margin-top: 10px;
    margin-right: 0;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    opacity: 1;
    background: #4caf30;
    margin-bottom: 25px;
    padding: 0.8rem 1.3rem;
    cursor: pointer;
    ${customMedia.lessThan("phone")`
    width: 327px;
    height: 46px;
`}
  }
`;
