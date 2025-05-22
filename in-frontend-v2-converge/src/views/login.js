import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as authActions from "../store/actions/auth";
import * as ROUTES from "../routes/routes";
import { toast, ToastContainer } from "react-toastify";

import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import AuthHOC from "./authHOC";

import "react-toastify/dist/ReactToastify.css";
const emailRegex = /^\S+@\S+\.\S+$/i;

export default function Login(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(authActions.login(data));
      setIsLoading(false);
      // eslint-disable-next-line react/prop-types
      props.history.push(`${ROUTES.DASHBOARD}`);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
      if (err.message.includes("verify your email")) {
        props.history.push(`${ROUTES.RESEND}`); //change to verify email page
      }
    }
  };

  return (
    <AuthHOC header="Welcome, Please Login">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label className="labels">Email address</label>
          <input
            placeholder="invest@investnaira.com"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "invest@investnaira.com")}
            style={{ color: "black", justifyContent: "space-between", display: "flex" }}
            className={errors.email ? "input-error input-empty" : "input-empty"}
            type="email"
            name="email"
            ref={register({ required: true, pattern: emailRegex })}
            required
          />
          <span style={{ color: "#db7302" }}>{errors.email && "Invalid Email"}</span>
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
              title={isLoading ? "Signing in..." : "SIGN IN"}
            />
            <Link to={ROUTES.FORGOT_PASSWORD}>
              <h3>{"Forgot Password?"}</h3>
            </Link>
          </div>
        </div>
      </form>
    </AuthHOC>
  );
}
