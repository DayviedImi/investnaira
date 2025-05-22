import React, { Component } from "react";
import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import { Button } from "../components/Button";
import Navbar from "../components/Navbar";
import Nav from "../components/Navbar/Navbar";

const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegEx = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;

// const regexp = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
const initState = {
  checked: false,
  email: "",
  password: "",
  phone: "",
  emailError: "",
  passwordError: "",
  phoneError: "",
};

class Form extends Component {
  state = initState;
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  //  Validate
  validate = () => {
    let inputError = false;
    const errors = {
      emailError: "",
      passwordError: "",
      phoneError: "",
    };
    if (!this.state.email) {
      inputError = true;
      errors.emailError = "Please enter a valid email";
      errors.phoneError = "Please enter a valid Phone Number";
    } else if (!this.state.email.match(emailRegex)) {
      inputError = true;
      errors.emailError = (
        <span style={{ color: "red" }}>Your email address must be valid</span>
      );
    } else if (!this.state.phone.match(phoneRegEx)) {
      inputError = true;
      errors.phoneError = (
        <span style={{ color: "red" }}>Your Phone Number must be valid</span>
      );
    }
    if (this.state.password.length < 4) {
      inputError = true;
      errors.passwordError =
        "Your password must contain between 4 and 60 characters";
    }
    this.setState({
      ...errors,
    });

    return inputError;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.setState(initState);
    }
  };

  //Checkbox
  handlerCheckbox = (e) => {
    this.setState({
      checked: e.target.checked,
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <Navbar />
        <div>
          <FormContainer>
            <h1 className="formHeader">Start building today!</h1>
            <div className="form-container">
              <form>
                <div className="input-container">
                  <label className="labels">Email address</label>
                  <input
                    placeholder="someone@example.com."
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "someone@example.com")
                    }
                    placeholderStyle={{
                      fontFamily: "AvenirNextCyr-Bold",
                      Color: "red",
                    }}
                    className={
                      this.state.emailError
                        ? "input-error input-empty"
                        : "input-empty"
                    }
                    type="email"
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    required
                  />
                  <span style={{ color: "#db7302" }}>
                    {this.state.emailError}
                  </span>
                </div>

                <div className="input-container">
                  <label className="labels">Password</label>
                  <input
                    placeholder="........................"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "........................")
                    }
                    className={
                      this.state.passwordError
                        ? "input-error input-empty"
                        : "input-empty"
                    }
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    required
                  />
                  <span style={{ color: "#db7302" }}>
                    {this.state.passwordError}
                  </span>
                </div>

                <div className="input-container">
                  <label className="labels">Phone Number</label>
                  <input
                    placeholder="(+234)   __ __ __    __ __ __    __ __ __ __"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "(+234)")}
                    className={
                      this.state.phoneError
                        ? "input-error input-empty"
                        : "input-empty"
                    }
                    type="text"
                    onChange={this.handlePhoneChange}
                    value={this.state.phone}
                    required
                  />
                  <span style={{ color: "#db7302" }}>
                    {this.state.phoneError}
                  </span>
                </div>
                <div className="startedText">
                  <div className="input-container">
                    <Button
                      className="txt button"
                      type="Submit"
                      title="GET STARTED NOW"
                      onClick={(e) => this.onSubmit(e)}
                    />
                  </div>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      defaultChecked={this.state.checked}
                      onChange={this.handlerCheckbox}
                    />
                    <span className="checkmark"></span>
                    Sign me up for NairaSense Newsletters
                  </label>
                  <p className="bottomForm">
                    By clicking "Get started", you agree to InvestNaira's
                    <span className="under"> Terms of Use </span> and{" "}
                    <span className="under"> Privacy Policy </span>
                  </p>
                </div>
              </form>
            </div>
          </FormContainer>
        </div>
      </div>
    );
  }
}

export default Form;
const customMedia = generateMedia({
  phone: "414px",
});

const FormContainer = styled.div`
  @import "../../assets/css/fonts.css";
  @import "../../App.css";

  input::placeholder {
    color: #cccccc;
  }

  display: grid;
  justify-content: center;
  .formHeader {
    text-align: center;
  }
  .startedText {
    margin-top: 50px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 570px;
    ${customMedia.lessThan("phone")`
        font-size:10px;
        width: 102px;
        height: 13px;
        margin-left:120px;
    `};
  }
  .form-container {
    width: 529px;
    height: 580px;
    ${customMedia.lessThan("phone")`
        margin-right: 0;
        width:327px;
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
        width:234px;
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
