import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as authActions from "../store/actions/auth";
import { toast, ToastContainer } from "react-toastify";

import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import { Button } from "../components/Button";
import Navbar from "../components/Navbar";
import Nav from "../components/Navbar/Navbar";

import "react-toastify/dist/ReactToastify.css";
const emailRegex = /^\S+@\S+\.\S+$/i;

export default function ResendVerification(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await dispatch(authActions.resend(data));
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Nav />
      <Navbar />
      <div className="container">
        <FormContainer>
          <h1 className="formHeader">Please verify your email</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <label className="labels">Email address</label>
              <input
                placeholder="invest@investnaira.com."
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "invest@investnaira.com")}
                placeholderStyle={{
                  fontFamily: "AvenirNextCyr-Bold",
                  Color: "red",
                }}
                className={errors.email ? "input-error input-empty" : "input-empty"}
                type="email"
                name="email"
                ref={register({ required: true, pattern: emailRegex })}
                required
              />
              <span style={{ color: "#db7302" }}>{errors.email && "Invalid Email"}</span>
            </div>
            <div className="startedText">
              <div className="input-container">
                <Button
                  className="txt button"
                  type="submit"
                  title={isLoading ? "Loading..." : "Verify Email"}
                />
              </div>
            </div>
          </form>
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

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: row;
    width: 100vw;
  }
  .formHeader {
    // text-align: center;
    // width: 100%;
  }
  .startedText {
    margin-top: 50px;
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
        display: flex;
        // align-items: center;
        // justify-content: center;
        // text-align: left;
    `};
  }
  .form-container {
    width: 529px;
    height: 580px;
    ${customMedia.lessThan("phone")`
        margin-right: 0;
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

// return (
//   <form onSubmit={handleSubmit(onSubmit)}>
//     <input
//       type="text"
//       placeholder="Invest"
//       name="firstname"
//       ref={register({ required: true, maxLength: 80 })}
//     />
//     {errors.firstname && "First name is required"}

//     <input
//       type="text"
//       placeholder="Naira"
//       name="lastname"
//       ref={register({ required: true, maxLength: 100 })}
//     />
//     {errors.lastname && "First name is required"}

//     <input
//       type="text"
//       placeholder="invest@investnaira.com"
//       name="email"
//       ref={register({ required: true, pattern: /^\S+@\S+\.\S+$/i })}
//     />
//     <input
//       type="tel"
//       placeholder="Mobile number"
//       name="phone_no"
//       ref={register({ required: true, maxLength: 14,pattern: /+234/i })}
//     />
//     <input
//       type="text"
//       placeholder="invest234"
//       name="referrer"
//       ref={register({ required: true, maxLength: 10 })}
//     />
//     <select name="source" ref={register({ required: true })}>
//       <option value="event">Event/Conference</option>
//       <option value="facebook">Facebook</option>
//       <option value="instagram"> Instagram</option>
//       <option value="search">Search Engine (Google, Yahoo etc)</option>
//       <option value="referral"> Friend/Family (Word of Mouth)</option>
//       <option value="blog"> Blog/Article</option>
//       <option value="other"> Other</option>
//     </select>
//     <input
//       type="password"
//       placeholder="Password"
//       name="password"
//       ref={register({ required: true })}
//     />
//     {/* Recaptcha */}
//     <input type="submit" />
//   </form>
// );
