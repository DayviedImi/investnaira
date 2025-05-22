import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as ROUTES from "../routes/routes";
import { toast, ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";
import Nav from "../components/Navbar/Navbar";

import "react-toastify/dist/ReactToastify.css";

export default function VerifyEmail(props) {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const { token } = props.match.params;

  const verifyEmail = useCallback(async () => {
    try {
      const response = await dispatch(authActions.verify({ token }));
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
      let msg = response.msg.toLowerCase();
      if (msg.includes(`email verified`)) {
        setIsVerified(true);
        window.setTimeout(props.history.push(ROUTES.LOGIN), 2000);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }, [dispatch, token, props.history]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);
  return (
    <div>
      <ToastContainer />
      <Nav />
      <Navbar />
      <div className="container">
        <h1 className="formHeader">
          {isVerified ? `Email Verified. Redirecting...` : "Attempting to verify Email..."}
        </h1>
      </div>
    </div>
  );
}
