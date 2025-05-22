import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Reaptcha from "reaptcha";
import { toast, ToastContainer } from "react-toastify";

import * as authActions from "../store/actions/auth";

import { Button } from "../components/Button";
import AuthHOC from "./authHOC";

import "react-toastify/dist/ReactToastify.css";
const emailRegex = /^\S+@\S+\.\S+$/i;

export default function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [recaptcha, setRecaptcha] = useState(null);
  const [show, setShow] = useState(true);
  const captchaRef = useRef();

  const { register, handleSubmit, errors, trigger, getValues } = useForm();
  const dispatch = useDispatch();

  const SignupSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (!recaptcha && !data.recaptcha) {
        await captchaRef.current.execute();
        return "early exit";
      } else if (recaptcha) {
        data.recaptcha = recaptcha;
      }
      console.log(data);
      const response = await dispatch(authActions.signup(data));
      toast.success(`${response.msg}`);
      window.location.reload();
      return "late exit";
      // eslint-disable-next-line react/prop-types
    } catch (err) {
      toast.error(err.message);
      // window.location.reload();
    } finally {
      setRecaptcha(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthHOC header="Start building today!">
      <ToastContainer />
      <div className="signup">
        <form onSubmit={handleSubmit(SignupSubmit)}>
          <div className="input-container">
            <label className="labels">First Name</label>
            <input
              placeholder="Invest"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Invest")}
              style={{ color: "black" }}
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
              style={{ color: "black" }}
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
              style={{ color: "black" }}
              className={errors.email ? "input-error input-empty" : "input-empty"}
              type="email"
              name="email"
              ref={register({ required: true, pattern: emailRegex })}
              required
            />
            <span style={{ color: "#db7302" }}>{errors.email && "Invalid Email"}</span>
          </div>
          <div className="input-container">
            <label className="labels">Phone Number</label>
            <input
              placeholder="(+234)   __ __ __    __ __ __    __ __ __ __"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "(+234)")}
              style={{ color: "black" }}
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
              defaultValue={props.id ? props.id : ""}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "invest2890")}
              style={{ color: "black" }}
              className={errors.referrer ? "input-error input-empty" : "input-empty"}
              type="text"
              name="referrer"
              ref={register({ required: false })}
            />
            <span style={{ color: "#db7302" }}>{errors.referrer && "Invalid Input"}</span>
          </div>
          <div className="input-container" style={{ left: "45px" }}>
            <label className="labels">Password</label>
            <div className="passwordCon">
              <input
                placeholder="........................"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "........................")}
                style={{ color: "black", justifyContent: "space-between", display: "flex" }}
                className={errors.password ? "input-error input-empty" : "input-empty"}
                type="password"
                id="password"
                name="password"
                required
                ref={register({ required: true })}
              />
              <span
                onClick={() => {
                  setShow(!show);
                  document.getElementById("password").type = show ? "text" : "password";
                }}
                className="field-icon">
                {show ? "SHOW" : "HIDE"}
              </span>
            </div>
            <span style={{ color: "#db7302" }}>{errors.email && "Invalid Password"}</span>
          </div>
          <div className="startedText">
            <div className="input-container">
              <Button
                className="txt button"
                type="submit"
                title={isLoading ? "Signing up..." : "SIGN UP"}
                // onClick={(e) => this.onSubmit(e)}
              />
            </div>
            <label className="checkbox-container">
              <input type="checkbox" name="subscribe" defaultChecked={true} ref={register} />
              Sign me up for NairaSense Newsletters
            </label>
            <Reaptcha
              ref={captchaRef}
              sitekey="6Leg36YUAAAAANHdWh13WZ_VhwRucqjtv0iCLOVu"
              onVerify={async (res) => {
                setRecaptcha(res); // Add a value imperatively
                await trigger();
                const data = await getValues();
                await SignupSubmit({ ...data, recaptcha: res });
                // console.log("validate", validate, "data", data, "resPost", resPost);
              }}
              size="invisible"
            />
            <p className="bottomForm">
              By clicking "Get started", you agree to InvestNaira's
              <span className="under"> Terms of Use </span> and
              <span className="under"> Privacy Policy </span>
            </p>
          </div>
        </form>
      </div>
    </AuthHOC>
  );
}
