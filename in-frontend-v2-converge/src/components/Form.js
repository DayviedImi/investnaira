import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Reaptcha from "reaptcha";
import "../assets/css/Started.css";

import * as authActions from "../store/actions/auth";

import { Button } from "./Button";

const emailRegex = /^\S+@\S+\.\S+$/i;

export default function Signup(props) {
  const [recaptcha, setRecaptcha] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const captchaRef = useRef();

  const { register, handleSubmit, errors, trigger, getValues } = useForm();
  const dispatch = useDispatch();

  const SignupSubmit = async (data) => {
    console.log("data", data);
    setIsLoading(true);
    try {
      if (!recaptcha && !data.recaptcha) {
        const testing = await captchaRef.current.execute();
        console.log("testing result", testing);
        return "early exit";
      } else if (recaptcha) {
        data.recaptcha = recaptcha;
      }

      console.log("recaptcha", recaptcha);
      const response = await dispatch(authActions.signup(data));
      console.log("response", response);
      alert(`${response.msg}`);
      return "late exit";
      // eslint-disable-next-line react/prop-types
    } catch (err) {
      console.log("error message", err.message);
    } finally {
      setRecaptcha(null);
      setIsLoading(false);
    }
  };
  console.log("errors", errors);

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(SignupSubmit)}>
        <div className="input-container">
          <label className="labels">First Name</label>
          <input
            placeholder="Invest"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Invest")}
            className={errors.firstname ? "input-error input-empty" : "input-empty"}
            type="text"
            name="firstname"
            ref={register({ required: true })}
            required
          />
          <span style={{ color: "#db7302" }}>{errors.firstname && "Invalid Input"}</span>
        </div>

        <div className="input-container">
          <label className="labels">Last Name</label>
          <input
            placeholder="Naira"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Naira")}
            className={errors.lastname ? "input-error input-empty" : "input-empty"}
            type="text"
            name="lastname"
            ref={register({ required: true })}
            required
          />
          <span style={{ color: "#db7302" }}>{errors.lastname && "Invalid Input"}</span>
        </div>
        <div className="input-container">
          <label className="labels">Email address</label>
          <input
            placeholder="invest@investnaira.com."
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "invest@investnaira.com")}
            className={errors.email ? "input-error input-empty" : "input-empty"}
            type="email"
            name="email"
            ref={register({ required: true, pattern: emailRegex })}
            required
          />
          <span style={{ color: "#db7302" }}>{errors.email && "Invalid Email"}</span>
        </div>
        {stage === 1 && (
          <div className="startedText">
            <div className="input-container">
              <Button
                className="txt button outlineButton"
                title="NEXT"
                onClick={() => setStage(2)}
              />
            </div>
          </div>
        )}
        {stage === 2 && (
          <div>
            <div className="input-container">
              <label className="labels">Phone Number</label>
              <input
                placeholder="(+234)   __ __ __    __ __ __    __ __ __ __"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "(+234)")}
                className={errors.phone_no ? "input-error input-empty" : "input-empty"}
                type="text"
                name="phone_no"
                ref={register({ required: true })}
                required
              />
              <span style={{ color: "#db7302" }}>{errors.phone_no && "Invalid Phone Number"}</span>
            </div>

            <div className="input-container">
              <label className="labels">Referral Code (Optional)</label>
              <input
                placeholder="invest2890"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "invest2890")}
                placeholderStyle={{
                  fontFamily: "AvenirNextCyr-Bold",
                  Color: "red",
                }}
                className={errors.referrer ? "input-error input-empty" : "input-empty"}
                type="text"
                name="referrer"
                ref={register({ required: false })}
              />
              <span style={{ color: "#db7302" }}>{errors.referrer && "Invalid Input"}</span>
            </div>
            <div className="input-container">
              <label className="labels">Password</label>
              <input
                placeholder="........................"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "........................")}
                className={errors.password ? "input-error input-empty" : "input-empty"}
                type="password"
                name="password"
                required
                ref={register({ required: true })}
              />
              <span style={{ color: "#db7302" }}>{errors.password && "Invalid Password"}</span>
            </div>
            <div className="startedText">
              <div className="input-container">
                <Button
                  className="txt button"
                  type="Submit"
                  title={isLoading ? "Signing up..." : "SIGN UP"}
                  // onClick={(e) => this.onSubmit(e)}
                />
              </div>
              <label className="checkbox-container">
                <input type="checkbox" name="subscribe" defaultChecked={true} ref={register} />
                <span className="checkmark"></span>
                Sign me up for NairaSense Newsletters
              </label>
              <Reaptcha
                ref={captchaRef}
                sitekey="6Leg36YUAAAAANHdWh13WZ_VhwRucqjtv0iCLOVu"
                onVerify={async (res) => {
                  setRecaptcha(res); // Add a value imperatively
                  const validate = await trigger();
                  const data = await getValues();
                  const resPost = await SignupSubmit({ ...data, recaptcha: res });
                  console.log("validate", validate, "data", data, "resPost", resPost);
                }}
                size="invisible"
              />
              <p className="bottomForm">
                By clicking "Get started", you agree to InvestNaira's
                <span className="under"> Terms of Use </span> and
                <span className="under"> Privacy Policy </span>
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
