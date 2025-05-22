import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { toast, ToastContainer } from "react-toastify";

import * as userActions from "../store/actions/user";
import * as ROUTES from "../routes/endpoints";
import { getReferrals } from "../store/actions/referrals";
import { getBankDetails } from "../store/actions/bank";
import { bankDetailsUpdate } from "../store/actions/bank";

import { logout } from "../store/actions/auth";
import AuthHOC from "./authHOC";
import "../assets/css/profile.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";

import LeftNav from "../components/LeftNav";

import { ReactComponent as Right } from "../assets/svg/chevron-right.svg";
import { ReactComponent as Down } from "../assets/svg/chevron-down.svg";
import { Button } from "../components/Button";

export default function Wallet() {
  const dispatch = useDispatch();
  const { register, errors } = useForm();
  const {
    register: registerBvnForm,
    errors: errorsBvnForm,
    handleSubmit: bvnFormSubmit,
  } = useForm();
  const {
    register: registerBankForm,
    errors: errorsBankForm,
    handleSubmit: bankFormSubmit,
  } = useForm();
  const {
    register: registerPersonalForm,
    errors: errorsPersonal,
    handleSubmit: personalFormSubmit,
  } = useForm();
  const {
    register: registerProfileForm,
    errors: errorsProfile,
    handleSubmit: profileFormSubmit,
  } = useForm();

  const emailRegex = /^\S+@\S+\.\S+$/i;

  const user = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  // const transactions = useSelector((state) => state.transactions);
  const bankAccount = useSelector((state) => state.bank.bankAccount);
  const banks = useSelector((state) => state.bank.banks);

  const [isUpdatingPersonal, setIsUpdatingPersonal] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingBVN, setIsUpdatingBVN] = useState(false);
  const [isUpdatingBank, setIsUpdatingBank] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [bvnVerifyStage, setBvnVerifyStage] = useState(1);

  const logoutFxn = async () => {
    console.log("logging out");
    await dispatch(logout());
  };

  const getUser = useCallback(async () => {
    try {
      console.log("fetching user dispatch");
      await dispatch(userActions.getDashboard(ROUTES.DASHBOARD_GET));
      dispatch(getReferrals()); //TODO: can separate out the different requests to when they are needed
      dispatch(getBankDetails());
    } catch (err) {
      if (err.message.includes("Authentication Error")) {
        await dispatch(logout());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const onUpdateBank = async (data) => {
    console.log("data", data);
    setIsUpdatingBank(true);
    try {
      const response = await dispatch(bankDetailsUpdate(ROUTES.BANK_ACCOUNT_SAVE, { ...data }));
      console.log("response", response);
      //TODO: update bank details
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
      console.log("error message", err.message);
    } finally {
      setIsUpdatingBank(false);
    }
  };
  const onUpdateBvn = async (data) => {
    setIsUpdatingBVN(true);
    try {
      const actionToDispatch =
        bvnVerifyStage === 1
          ? userActions.userUpdate(ROUTES.RESOLVE_BVN, {
              bvn: data.bvn,
              account_number: bankAccount.account_no,
              bank_code: bankAccount.bank_code,
              first_name: user.firstname,
              last_name: user.lastname,
            })
          : userActions.userUpdate(ROUTES.CONFIRM_BVN, {
              phone_no: data.phone_no,
              date_of_birth: data.date_of_birth,
            });
      const response = await dispatch(actionToDispatch);
      window.location.reload();
      console.log("response", response);
      if (response.msg.includes("enter your phone number")) setBvnVerifyStage(2);
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
      console.log("error message", err.message);
    } finally {
      setIsUpdatingBVN(false);
    }
  };

  const onUpdatePersonal = async (data) => {
    console.log("data", data);
    setIsUpdatingPersonal(true);
    try {
      const response = await dispatch(userActions.userUpdate(ROUTES.USER_UPDATE, { ...data }));
      console.log("response", response);
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
      console.log("error message", err.message);
    } finally {
      setIsUpdatingPersonal(false);
    }
  };

  const onUpdateProfile = async (data) => {
    console.log("data", data);
    setIsUpdatingProfile(true);
    try {
      const response = await dispatch(userActions.userUpdate(ROUTES.PROFILE_UPDATE, { ...data }));
      console.log("response", response);
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
      console.log("error message", err.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <AuthHOC logout={logoutFxn}>
      <ToastContainer />
      <LeftNav />
      <div className="profile" data-tut="sixth-step">
        <div className="profileDetails">
          {user.picture ? (
            <img alt="user" src={user.picture} className="userPicture" />
          ) : (
            <div className="userPicture" />
          )}
          <h3 className="userName">
            {user.firstname} {user.lastname}
          </h3>
          <h3 className="userEmail">{user.email}</h3>
        </div>
        <div className="profileHeaders">
          <h3 onClick={() => setIsOpen(!isOpen)} className="profileText">
            Personal Details
          </h3>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {isOpen ? <Down /> : <Right />}
          </div>
        </div>
        <hr />
        {isOpen && (
          <form onSubmit={personalFormSubmit(onUpdatePersonal)}>
            <div className="formRow">
              <div className="input-container">
                <label className="profileLabels">First Name</label>
                <input
                  placeholder={user.firstname}
                  onFocus={(e) => (e.target.placeholder = "")}
                  placeholderStyle={{
                    fontFamily: "AvenirNextCyr-Bold",
                    Color: "red",
                  }}
                  disabled
                  className={
                    errors.firstname ? "input-error input-empty" : "input-empty userDetails"
                  }
                  type="text"
                  name="firstname"
                  ref={register({ required: true })}
                  required
                />
                <span style={{ color: "#db7302" }}>{errors.firstname && "Invalid Input"}</span>
              </div>
              <div className="input-container">
                <label className="profileLabels">Last Name</label>
                <input
                  placeholder={user.lastname}
                  disabled
                  onFocus={(e) => (e.target.placeholder = "")}
                  placeholderStyle={{
                    fontFamily: "AvenirNextCyr-Bold",
                    Color: "red",
                  }}
                  className={
                    errors.lastname ? "input-error input-empty" : "input-empty userDetails"
                  }
                  type="text"
                  name="lastname"
                  ref={register({ required: true })}
                  required
                />
                <span style={{ color: "#db7302" }}>{errors.lastname && "Invalid Input"}</span>
              </div>
              <div className="input-container">
                <label className="profileLabels">Email address</label>
                <input
                  disabled
                  placeholder={user.email}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "invest@investnaira.com")}
                  placeholderStyle={{
                    fontFamily: "AvenirNextCyr-Bold",
                    Color: "red",
                  }}
                  className={errors.email ? "input-error input-empty" : "input-empty userDetails "}
                  type="email"
                  name="email"
                  ref={register({ required: true, pattern: emailRegex })}
                  required
                />
                <span style={{ color: "#db7302" }}>{errors.email && "Invalid Email"}</span>
              </div>
            </div>
            <div className="formRow" style={{ alignItems: "flex-end" }}>
              <div className="input-container">
                <label className="profileLabels">Username</label>
                <input
                  defaultValue={user.short_id}
                  onBlur={(e) => (e.target.placeholder = `${user.short_id}`)}
                  className={
                    errorsPersonal.new_username
                      ? "input-error input-empty"
                      : "input-empty userDetails"
                  }
                  type="text"
                  name="new_username"
                  required
                  ref={registerPersonalForm({ required: true })}
                />
              </div>
              <div className="input-container ">
                <label className="profileLabels">Phone Number</label>
                <input
                  defaultValue={user.phone_no}
                  placeholder="(+234) __ __ __  __ __ __  __ __ __ __"
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "(+234)")}
                  className={
                    errors.phone_no ? "input-error input-empty" : "input-empty userDetails "
                  }
                  type="text"
                  name="phone_no"
                  ref={registerPersonalForm({ required: true })}
                  required
                />
                <span style={{ color: "#db7302" }}>
                  {errors.phone_no && "Invalid Phone Number"}
                </span>
              </div>
              <Button
                style={{
                  height: "calc(0.03 * 100vw) !important",
                }}
                className="txt button profBut"
                type="Submit"
                title={isUpdatingPersonal ? "Loading..." : "Update User Details"}
              />
            </div>
          </form>
        )}
        <div className="profileHeaders">
          <h3 onClick={() => setIsOpen2(!isOpen2)} className="profileText">
            KYC Details
          </h3>
          {isOpen2 ? <Down /> : <Right />}
        </div>
        <hr />
        {isOpen2 && (
          <form onSubmit={profileFormSubmit(onUpdateProfile)}>
            <div className="formRow">
              <div className="input-container userDetails">
                <label className="profileLabels">Gender</label>
                <select
                  name="gender"
                  style={{ height: "100px!important" }}
                  className={errors.gender ? "input-error input-empty" : "input-empty userDetails "}
                  defaultValue={profile.gender}
                  ref={registerProfileForm({ required: true })}>
                  <option
                    style={{ border: "2px solid #B3B3B347", borderRadius: "7px" }}
                    name="fund"
                    value="male">
                    Male
                  </option>
                  <option
                    style={{ border: "2px solid #B3B3B347", borderRadius: "7px" }}
                    name="fund"
                    value="female">
                    Female
                  </option>
                </select>
              </div>
              <div className="input-container">
                <label className="profileLabels">Date Of Birth </label>
                <input
                  defaultValue={
                    profile.date_of_birth
                      ? format(parseISO(profile.date_of_birth), "yyyy-MM-dd")
                      : format(new Date(), "yyyy-MM-dd")
                  }
                  className={
                    errorsProfile.date_of_birth
                      ? "input-error input-empty"
                      : "input-empty userDetails "
                  }
                  type="date"
                  name="date_of_birth"
                  required
                  ref={registerProfileForm({ required: true })}
                />
              </div>
              <div className="input-container">
                <label className="profileLabels">Place of Birth</label>
                <input
                  defaultValue={profile.place_of_birth}
                  // onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = `${profile.place_of_birth}`)}
                  className={
                    errorsProfile.place_of_birth
                      ? "input-error input-empty"
                      : "input-empty userDetails "
                  }
                  type="text"
                  name="place_of_birth"
                  required
                  ref={registerProfileForm({ required: true })}
                />
              </div>
            </div>
            <div className="formRow">
              <div className="input-container">
                <label className="profileLabels">Address</label>
                <input
                  defaultValue={profile.address}
                  // onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = `${profile.address}`)}
                  className={
                    errorsProfile.address ? "input-error input-empty" : "input-empty userDetails"
                  }
                  type="text"
                  name="address"
                  required
                  ref={registerProfileForm({ required: true })}
                />
              </div>
              <div className="input-container">
                <label className="profileLabels">Address City</label>
                <input
                  defaultValue={profile.city}
                  // onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = `${profile.city}`)}
                  className={
                    errorsProfile.city ? "input-error input-empty" : "input-empty userDetails "
                  }
                  type="text"
                  name="city"
                  required
                  ref={registerProfileForm({ required: true })}
                />
              </div>
              <div className="input-container">
                <label className="profileLabels">Address State</label>
                <input
                  defaultValue={profile.state}
                  // onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = `${profile.state}`)}
                  className={
                    errorsProfile.state ? "input-error input-empty" : "input-empty userDetails"
                  }
                  type="text"
                  name="state"
                  required
                  ref={registerProfileForm({ required: true })}
                />
              </div>
            </div>
            <div className="formRow" style={{ alignItems: "flex-end" }}>
              <div className="input-container">
                <label className="profileLabels">Next of Kin</label>
                <input
                  defaultValue={profile.next_of_kin_name}
                  // onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = `${profile.next_of_kin_name}`)}
                  className={
                    errorsProfile.next_of_kin_name
                      ? "input-error input-empty"
                      : "input-empty userDetails "
                  }
                  type="text"
                  name="next_of_kin_name"
                  required
                  ref={registerProfileForm({ required: true })}
                />
              </div>
              <div className="input-container ">
                <label className="profileLabels">Next of Kin's Phone</label>
                <input
                  placeholder="(+234) __ __ __  __ __ __  __ __ __ __"
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = `${profile.next_of_kin_phone}`)}
                  defaultValue={profile.next_of_kin_phone}
                  className={
                    errors.phone_no ? "input-error input-empty" : "input-empty userDetails "
                  }
                  type="text"
                  name="next_of_kin_phone"
                  required
                  ref={registerProfileForm({ required: true })}
                />
                <span style={{ color: "#db7302" }}>
                  {errors.phone_no && "Invalid Phone Number"}
                </span>
              </div>
              <Button
                style={{
                  height: "calc(0.03 * 100vw) !important",
                }}
                className="txt button profBut"
                type="Submit"
                title={isUpdatingProfile ? "Loading..." : "EDIT"}
              />
            </div>
          </form>
        )}
        <div className="profileHeaders">
          <h3 onClick={() => setIsOpen3(!isOpen3)} className="profileText">
            Banks and Cards
          </h3>
          {isOpen3 ? <Down /> : <Right />}
        </div>
        <hr />

        {isOpen3 && (
          <div>
            {profile.bvn_verified ? (
              <div>
                <h4 style={{ color: "#4CAF50" }}>BVN Verified!</h4>
              </div>
            ) : (
              <form onSubmit={bvnFormSubmit(onUpdateBvn)} id="bankFormContainer">
                <div className="bankForm">
                  <label className="profileLabels">BVN Details</label>
                  {bvnVerifyStage === 1 ? (
                    <div>
                      <div className="bank-input-container">
                        <div className="bankLabelContainer">
                          <label className="bankLabels">BVN</label>
                        </div>
                        <input
                          className={
                            errorsBvnForm.bvn ? "input-error input-empty" : "input-empty bankField"
                          }
                          type="text"
                          name="bvn"
                          ref={registerBvnForm()}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div className="bank-input-container">
                        <div className="bankLabelContainer">
                          <label className="bankLabels">Phone Number</label>
                        </div>
                        <input
                          className={
                            errorsBvnForm.phone_no
                              ? "input-error input-empty"
                              : "input-empty bankField"
                          }
                          type="text"
                          name="phone_no"
                          ref={registerBvnForm()}
                        />
                      </div>
                      <div className="bank-input-container">
                        <div className="bankLabelContainer">
                          <label className="bankLabels">Date of Birth</label>
                        </div>
                        <input
                          defaultValue={
                            profile.date_of_birth
                              ? format(parseISO(profile.date_of_birth), "yyyy-MM-dd")
                              : format(new Date(), "yyyy-MM-dd")
                          }
                          className={
                            errorsProfile.date_of_birth
                              ? "input-error input-empty"
                              : "input-empty bankField"
                          }
                          type="date"
                          name="date_of_birth"
                          required
                          ref={registerBvnForm({ required: true })}
                        />
                      </div>
                    </div>
                  )}
                  <div className="startedText">
                    <div className="input-container">
                      <Button
                        style={{
                          height: "calc(0.03 * 100vw) !important",
                        }}
                        className="txt button"
                        type="Submit"
                        title={
                          isUpdatingBVN
                            ? "Loading..."
                            : bvnVerifyStage === 1
                            ? "Verify BVN"
                            : "Verify Details"
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            <form onSubmit={bankFormSubmit(onUpdateBank)} id="bankFormContainer">
              <div className="bankForm">
                <label className="profileLabels">Bank Details</label>
                <div className="bank-input-container">
                  <div className="bankLabelContainer">
                    <label className="bankLabels">Account Name</label>
                  </div>
                  <p>{bankAccount.account_name}</p>
                </div>
                <div className="bank-input-container">
                  <div className="bankLabelContainer">
                    <label className="bankLabels">Account Number</label>
                  </div>
                  <input
                    defaultValue={bankAccount.account_no}
                    onBlur={(e) => (e.target.placeholder = `${bankAccount.account_no}`)}
                    className={
                      errorsBankForm.account_no
                        ? "input-error input-empty"
                        : "input-empty bankField"
                    }
                    type="text"
                    name="account_no"
                    required
                    ref={registerBankForm({ required: true })}
                  />
                </div>
                <div className="bank-input-container">
                  <div className="bankLabelContainer">
                    <label className="bankLabels">Bank Name</label>
                  </div>
                  <select
                    className={
                      errorsBankForm.bank_name ? "input-error input-empty" : "input-empty bankField"
                    }
                    name="bank_code"
                    defaultValue={bankAccount.bank_code}
                    ref={registerBankForm({ required: true })}>
                    {banks.map((item, index) => (
                      <option name="fund" key={item.bank_code} value={item.bank_code}>
                        {item.bank_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="startedText">
                  <div className="input-container">
                    <Button
                      className="txt button"
                      type="Submit"
                      title={isUpdatingBank ? "Loading..." : "Update Bank Details"}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </AuthHOC>
  );
}
