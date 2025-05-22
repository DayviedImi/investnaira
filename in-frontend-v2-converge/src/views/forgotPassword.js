import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as authActions from "../store/actions/auth";
import { toast, ToastContainer } from "react-toastify";

import { Button } from "../components/Button";
import AuthHOC from "./authHOC";

import "react-toastify/dist/ReactToastify.css";
const emailRegex = /^\S+@\S+\.\S+$/i;

export default function ForgotPassword(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    console.log("data", data);
    setIsLoading(true);
    try {
      const response = await dispatch(authActions.forgot(data));
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthHOC header="Enter your email to reset your password">
      <ToastContainer />
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
              title={isLoading ? "Loading..." : "Request Password Reset"}
            />
          </div>
        </div>
      </form>
    </AuthHOC>
  );
}
