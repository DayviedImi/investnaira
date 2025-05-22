import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as authActions from "../store/actions/auth";
import * as ROUTES from "../routes/routes";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../components/Button";
import AuthHOC from "./authHOC";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const { token } = props.match.params;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await dispatch(authActions.reset({ ...data, token }));
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
      window.setTimeout(props.history.push(ROUTES.LOGIN), 2000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthHOC header="Enter Your New Password">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="input-container">
          <label className="labels">Confirm Password</label>
          <input
            placeholder="........................"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "........................")}
            className={errors.password_confirm ? "input-error input-empty" : "input-empty"}
            type="password"
            name="password_confirm"
            required
            ref={register({ required: true })}
          />
          <span style={{ color: "#db7302" }}>{errors.password_confirm && "Invalid Password"}</span>
        </div>
        <div className="startedText">
          <div className="input-container">
            <Button
              className="txt button"
              type="submit"
              title={isLoading ? "Loading..." : "Reset Password"}
            />
          </div>
        </div>
      </form>
    </AuthHOC>
  );
}
