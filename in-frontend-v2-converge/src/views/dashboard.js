import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import Carousel from "nuka-carousel";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Tour from "reactour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { ToastContainer, toast } from "react-toastify";

// import { useRavePayment } from "react-ravepayment";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import * as userActions from "../store/actions/user";
import * as ROUTES from "../routes/endpoints";
import { getReferrals } from "../store/actions/referrals";
import { getBankDetails } from "../store/actions/bank";
import * as planActions from "../store/actions/plans";
import { ReactComponent as Credit } from "../assets/svg/Transfer Credit.svg";
import { ReactComponent as Debit } from "../assets/svg/Transfer Debit.svg";
import { ReactComponent as Down } from "../assets/svg/chevron-down.svg";
import { ReactComponent as Close } from "../assets/svg/close.svg";
import { ReactComponent as Conservative } from "../assets/svg/conservative.svg";
import { ReactComponent as Balanced } from "../assets/svg/balanced.svg";
import { ReactComponent as Aggressive } from "../assets/svg/aggressive.svg";
import { ReactComponent as Wallet } from "../assets/svg/fundWallet.svg";
import { ReactComponent as Flutter } from "../assets/svg/fundFlutter.svg";
import { ReactComponent as Calculator } from "../assets/svg/calculator.svg";
import { ReactComponent as Check } from "../assets/svg/checkMark.svg";

import { logout } from "../store/actions/auth";
import AuthHOC from "./authHOC";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/dashboard.css";
import "react-circular-progressbar/dist/styles.css";

import {
  // fundsDropdown,
  frequencyDropdown,
  maturityDateDropdownWithDate,
  maturityDateDropdown,
} from "../utils/helperFxns";
import LeftNav from "../components/LeftNav";
import { Table } from "@material-ui/core";
import { Button } from "../components/Button";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { register: registerPlanCreateForm, handleSubmit: planCreateFormSubmit } = useForm();
  const { register: registerPlanEditForm, handleSubmit: planEditFormSubmit, errors } = useForm();

  const user = useSelector((state) => state.auth);
  const plans = useSelector((state) => state.plans);
  const transactions = useSelector((state) => state.transactions);

  const planIDs = Object.keys(plans);
  console.log("planIDs", planIDs);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [createState, setCreateState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fund, setFund] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState(1000);
  const [item, setItem] = useState({});
  const [initialDep, setInitialDep] = useState({});
  const [target, setTarget] = useState({});
  const [name, setName] = useState();
  const [selectedID, setSelectedID] = useState(planIDs[0]);
  const filteredTransactions = selectedID
    ? transactions.filter((transaction) => transaction.entity_id === selectedID)
    : transactions;
  const trans = !showAll ? filteredTransactions.slice(0, 5) : filteredTransactions;
  const [maturityDateArr, setMaturityDateArr] = useState(maturityDateDropdownWithDate);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fundTypes = [
    {
      id: 1,
      icon: <Conservative />,
      name: "Conservative",
      roi: "6-9%",
      description: "The short term race",
    },
    {
      id: 2,
      icon: <Balanced />,
      name: "Balanced",
      roi: "12-15%",
      description: "The middle line race",
    },
    {
      id: 3,
      icon: <Aggressive />,
      name: "Aggressive",
      roi: "18-25%",
      description: "Take it all & Win",
    },
  ];

  const config = {
    public_key: "FLWPUBK-2ea259aca6c035b2b461e8d07a766091-X",
    tx_ref: `rv${Math.floor(Math.random() * 10000000000000000)}`,
    amount: parseInt(amount),
    payment_plan: frequency,
    currency: "NGN",
    production: true,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user.email,
      phonenumber: user.phone_no,
      name: `${user.firstname} ${user.lastname}`,
    },
    meta: { plan: selectedPlan },

    // meta: [{ metaname: "plan", metavalue: selectedPlan }],
  };

  const handleFlutterPayment = useFlutterwave(config);

  const initializePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
    });
  };

  const tourConfig = [
    {
      selector: "[data-tut='first-step']",
      content: "Create a plan: Set up your investment plan to invest your funds for the long term.",
    },
    {
      selector: "[data-tut='second-step']",
      content: "Transactions: All your deposits, withdrawals and transfers show up here",
    },

    // ...
  ];

  const accentColor = "#4CAF50";

  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

  const closeTour = () => {
    setIsTourOpen(false);
  };

  const logoutFxn = async () => {
    setIsLoading(true);
    await dispatch(logout());
  };

  const fundChange = async (fund) => {
    // basically, if conservtive (1), allow 3 months $ above
    //if balanced (2), 6 months and above
    //aggressive, 1 year and above
    let newArray = maturityDateDropdownWithDate;
    if (parseInt(fund) === 2) {
      newArray = maturityDateDropdownWithDate.slice(1);
    } else if (parseInt(fund) === 3) {
      newArray = maturityDateDropdownWithDate.slice(2);
    }
    setMaturityDateArr(newArray);
  };
  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(userActions.getDashboard(ROUTES.DASHBOARD_GET));
      dispatch(getReferrals()); //TODO: can separate out the different requests to when they are needed
      dispatch(getBankDetails());
      setIsLoading(false);
    } catch (err) {
      if (err.message.includes("Authentication Error")) {
        await dispatch(logout());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const onPlanCreate = async (data) => {
    data.target = parseFloat(data.target.replace(/,/g, ""));
    data.amount = parseFloat(data.amount.replace(/,/g, ""));
    setIsLoading(true);
    try {
      const response = await dispatch(planActions.createPlan(data));
      setSelectedPlan(response.plan.plan_id);
      // eslint-disable-next-line react/prop-types
      // await initializePayment();
      toast.success(`${response.msg}`);
      // alert(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      setIsCreating(false);
    }
  };

  const onPlanEdit = async (data) => {
    setIsLoading(true);
    try {
      const response = await dispatch(planActions.editPlan(data));
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      setIsCreating(false);
    }
  };

  const onPlanDelete = async (plan_id) => {
    setIsLoading(true);
    try {
      const response = await dispatch(planActions.deletePlan({ plan_id }));
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      setIsCreating(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      {isCreating ? (
        <div className="creatingContainer">
          <div
            className="creatingBackground"
            onClick={() => {
              setIsCreating(false);
              setIsMore(false);
              setItem({});
            }}
          />
          <div
            style={{ height: "auto", width: createState === 3 && "700px" }}
            className="creatingBox">
            {isDeleting ? (
              <div className="deleteConfirmCont">
                <div onClick={() => setIsCreating(false)} className="closeModal">
                  <Close />
                </div>
                <h1 className="closeModalHeader">Are you sure about this?</h1>
                <p className="closeModalDescription">
                  You are about to delete a plan. <br />
                  You cannot undo this action.
                </p>
                <div className="delButCont">
                  <Button
                    style={{ backgroundColor: "#FE0000", marginRight: 0, border: 0 }}
                    onClick={() => onPlanDelete(item.plan_id)}
                    title="DELETE PLAN"
                  />
                </div>
              </div>
            ) : isMore ? (
              <div className="progressCont">
                <div className="progressContainer">
                  <div className="progressBarContainer">
                    <CircularProgressbar
                      value={item.balance}
                      maxValue={item.target}
                      styles={buildStyles({
                        pathColor: "#4caf50",
                        trailColor: "#00000029",
                      })}
                      strokeWidth={15}
                    />
                  </div>
                  <div className="progressDetails">
                    <h2 className="progressPercentage">
                      {~~((item.balance / item.target) * 100)}%
                    </h2>
                    <h5 className="progressTarget">complete</h5>
                  </div>
                </div>
                <div>
                  <p
                    onClick={() => setIsDeleting(true)}
                    style={{ cursor: "pointer" }}
                    className="deleteText">
                    Delete Plan
                  </p>
                </div>
              </div>
            ) : (
              <div className="createTitle">
                <h3 className="createPlanModalHeader">
                  {createState === 0
                    ? `Select a Plan`
                    : createState === 2 || createState === 3
                    ? `Investment Calculator`
                    : createState === 1
                    ? `${fund} Fund`
                    : createState === 4
                    ? "Fund a Plan"
                    : ""}
                </h3>
                {createState !== 5 && (
                  <div onClick={() => setIsCreating(false)} style={{ padding: 5 }}>
                    <p
                      style={{ cursor: "pointer", textDecoration: "none" }}
                      className="closeModalText">
                      X
                    </p>
                  </div>
                )}
              </div>
            )}
            {!isDeleting && (
              <form
                onSubmit={
                  isMore ? planEditFormSubmit(onPlanEdit) : planCreateFormSubmit(onPlanCreate)
                }>
                {createState === 0 ? (
                  fundTypes.map((item, key) => (
                    <div
                      onClick={(e) => {
                        fundChange(e.target.value);
                        setFund(item.name);
                        setCreateState(1);
                      }}
                      name="fund"
                      key={item.id}
                      value={item.id}
                      ref={registerPlanCreateForm({ required: true })}
                      className="fundBox">
                      {item.icon}
                      <div className="fundType">
                        <p className="fundTypeName">{item.name}</p>
                        <p className="fundTypeDetails">{`${item.roi} ROI | ${item.description}`}</p>
                      </div>
                    </div>
                  ))
                ) : createState === 1 ? (
                  <div>
                    <div className="input-container">
                      <p className="p">Plan Name</p>
                      <input
                        defaultValue={!item.plan_name ? "Millionaire" : item.plan_name}
                        name="plan_name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="createInput"
                        ref={
                          isMore
                            ? registerPlanEditForm({ required: true })
                            : registerPlanCreateForm({ required: true })
                        }
                      />
                    </div>
                    <input
                      defaultValue={item.plan_id}
                      name="plan_id"
                      type="hidden"
                      required
                      ref={registerPlanEditForm({ required: true })}
                    />
                    {!isMore && (
                      <div className="input-container">
                        <p className="p">Initial Deposit</p>
                        <div className="initialDepRow">
                          <input
                            defaultValue={
                              !item.target
                                ? parseInt(1000).toLocaleString()
                                : parseInt(item.target).toLocaleString()
                            }
                            name="amount"
                            onBlur={(e) => {
                              parseInt(e.target.value).toLocaleString();
                              setAmount(e.target.value);
                            }}
                            type="text"
                            required
                            className="createInput mergedField"
                            ref={registerPlanCreateForm({ required: true })}
                          />
                          <Calculator
                            onClick={() => setCreateState(2)}
                            style={{ width: "12.5%", cursor: "pointer" }}
                          />
                        </div>
                        {errors.target && (
                          <h5 style={{ color: "red", textAlign: "left" }}>
                            Your input required to be more than &#8358; 100
                          </h5>
                        )}
                      </div>
                    )}
                    <div className="input-container">
                      <p className="p">Target Amount</p>
                      <input
                        defaultValue={
                          !item.target
                            ? parseInt(1000000).toLocaleString()
                            : parseInt(item.target).toLocaleString()
                        }
                        name="target"
                        onBlur={(e) => parseInt(e.target.value).toLocaleString()}
                        type="text"
                        required
                        className="createInput"
                        ref={
                          isMore
                            ? registerPlanEditForm({ required: true, min: item.balance })
                            : registerPlanCreateForm({ required: true })
                        }
                      />
                      {errors.target && (
                        <h5 style={{ color: "red", textAlign: "left" }}>
                          Your input required to be more than &#8358;
                          {parseInt(item.balance).toLocaleString()}
                        </h5>
                      )}
                    </div>
                    <div className="input-container">
                      <p className="p">{isMore ? "Extend Maturity Date by" : "Maturity Date"}</p>
                      <select
                        name="maturity_date"
                        className="createInput"
                        defaultValue={0}
                        ref={
                          isMore
                            ? registerPlanEditForm({ required: true })
                            : registerPlanCreateForm({ required: true })
                        }>
                        {isMore
                          ? maturityDateDropdown.map((item, index) => (
                              <option
                                style={{ border: "2px solid #B3B3B347", borderRadius: "7px" }}
                                name="fund"
                                key={item.id}
                                value={item.id}>
                                {item.value}
                              </option>
                            ))
                          : maturityDateArr.map((item, index) => (
                              <option
                                style={{ border: "2px solid #B3B3B347", borderRadius: "7px" }}
                                name="fund"
                                key={item.id}
                                value={item.id}>
                                {item.value}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div className="input-container">
                      <p className="p">Saving frequency</p>
                      <select
                        name="frequency"
                        className="createInput"
                        defaultValue={1}
                        onChange={(e) => {
                          setFrequency(e.target.options[e.target.selectedIndex].id);
                        }}
                        ref={registerPlanCreateForm({ required: true })}>
                        {frequencyDropdown.map((item, index) => (
                          <option
                            className="createInput"
                            id={item.payment_plan}
                            name="fund"
                            key={item.id}
                            value={item.id}>
                            {item.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : createState === 2 || createState === 3 ? (
                  <div className="calculatorContainer">
                    <div
                      style={{
                        borderRight: createState === 3 && `1px solid #4caf50`,
                        paddingRight: createState === 3 && `20px`,
                      }}>
                      <div className="input-container">
                        <p className="p">Initial Deposit</p>
                        <input
                          defaultValue={
                            !item.target
                              ? parseInt(1000).toLocaleString()
                              : parseInt(item.target).toLocaleString()
                          }
                          name="amount"
                          onBlur={(e) => {
                            parseInt(e.target.value).toLocaleString();
                            setAmount(e.target.value);
                          }}
                          type="text"
                          required
                          className="createInput"
                        />
                      </div>
                      <div className="input-container">
                        <p className="p">Duration</p>
                        <div className="initialDepRow">
                          <input
                            defaultValue={
                              !item.target
                                ? parseInt(1000).toLocaleString()
                                : parseInt(item.target).toLocaleString()
                            }
                            name="amount"
                            onBlur={(e) => {
                              parseInt(e.target.value).toLocaleString();
                              setAmount(e.target.value);
                            }}
                            style={{ width: "45%" }}
                            type="text"
                            required
                            className="createInput mergedField"
                            ref={registerPlanCreateForm({ required: true })}
                          />
                          <select
                            name="frequency"
                            className="createInput"
                            style={{ width: "45%", top: "9px", position: "relative" }}
                            defaultValue={1}
                            onChange={(e) => {
                              setFrequency(e.target.options[e.target.selectedIndex].id);
                            }}
                            ref={registerPlanCreateForm({ required: true })}>
                            <option className="createInput" name="freq" value={1}>
                              Years
                            </option>
                            <option className="createInput" name="freq" value={2}>
                              Months
                            </option>
                            <option className="createInput" name="freq" value={3}>
                              Weeks
                            </option>
                            <option className="createInput" name="freq" value={4}>
                              Days
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="input-container">
                        <p className="p">Recurring Payment</p>
                        <input
                          defaultValue={
                            !item.target
                              ? parseInt(1000).toLocaleString()
                              : parseInt(item.target).toLocaleString()
                          }
                          name="amount"
                          onBlur={(e) => {
                            parseInt(e.target.value).toLocaleString();
                            setAmount(e.target.value);
                          }}
                          type="text"
                          required
                          className="createInput"
                        />
                      </div>
                    </div>
                    {createState === 3 && (
                      <div className="calculatorResults">
                        <p />
                        <div style={{ backgroundColor: "#395D45" }} className="individualResult">
                          1st Year Projection: &#8358; 0.00
                        </div>
                        <p />
                        <div style={{ backgroundColor: "#754669" }} className="individualResult">
                          3rd Year Projection: &#8358; 0.00
                        </div>
                        <p />
                        <div style={{ backgroundColor: "#4CAF50" }} className="individualResult">
                          10th Year Projection: &#8358; 0.00
                        </div>
                      </div>
                    )}
                  </div>
                ) : createState === 4 ? (
                  <div>
                    <div className="fundRow1">
                      <p className="fundPlanName">{`${fund} - ${name}`}</p>
                      <p className="fundPlanEdit">Edit</p>
                    </div>
                    <div className="fundRow2">
                      <div className="amountCol">
                        <p className="fundPlanAmountHeader">Initial Deposit</p>
                        <input
                          defaultValue={
                            !item.target
                              ? parseInt(1000).toLocaleString()
                              : parseInt(item.target).toLocaleString()
                          }
                          name="amount"
                          onBlur={(e) => {
                            parseInt(e.target.value).toLocaleString();
                            setAmount(e.target.value);
                          }}
                          type="text"
                          onChange={(e) => setInitialDep(e.target.value)}
                          required
                          className="createInput"
                        />
                      </div>
                      <div className="amountCol">
                        <p className="fundPlanAmountHeader">Target Amount</p>
                        <input
                          defaultValue={
                            !target
                              ? parseInt(1000000).toLocaleString()
                              : parseInt(target).toLocaleString()
                          }
                          name="target"
                          onBlur={(e) => parseInt(e.target.value).toLocaleString()}
                          type="text"
                          onChange={(e) => setTarget(e.target.value)}
                          required
                          className="createInput"
                          ref={
                            isMore
                              ? registerPlanEditForm({ required: true, min: item.balance })
                              : registerPlanCreateForm({ required: true })
                          }
                        />
                      </div>
                    </div>
                    <div onClick={() => setCreateState(5)} className="paymentChannels">
                      <Wallet />
                      <p className="paymentNames">Via Wallet</p>
                    </div>
                    <div className="paymentChannels" onClick={() => initializePayment}>
                      <Flutter />
                      <p className="paymentNames">Online Payment</p>
                    </div>
                  </div>
                ) : (
                  <div className="doneModal">
                    <Check />
                    <p className="doneText">
                      Your {fund} plan - {name} with ₦{initialDep} has been created successfully.
                    </p>
                  </div>
                )}
                <div className="startedText">
                  <div className="input-container">
                    {createState !== 0 && (
                      <div>
                        {createState === 1 ? (
                          <Button
                            className="txt button createButton"
                            onClick={(e) => {
                              setCreateState(4);
                            }}
                            type="Submit"
                            title={isLoading ? "Loading..." : "Create Plan"}
                          />
                        ) : createState === 2 || createState === 3 ? (
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              setCreateState(3);
                            }}
                            className="txt button createButton"
                            title={isLoading ? "Loading..." : "Calculate"}
                          />
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
      <AuthHOC logout={logoutFxn}>
        <LeftNav />
        <div className="homepage">
          <div className="plans">
            <div className="planContainer"></div>
            <div
              style={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
                background: "#D5F3E3",
              }}>
              <div>
                <h3 style={{ color: "#4caf50" }} className="welcome">
                  Welcome {user.firstname},
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  //
                }}>
                <Carousel
                  afterSlide={(e) => console.log("example", setSelectedID(planIDs[e]))}
                  width={"100%"}
                  style={{
                    height: "260px",
                    width: "424px",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  slidesToShow={1}
                  defaultControlsConfig={{
                    nextButtonText: ">",
                    prevButtonText: "<",
                    pagingDotsStyle: {
                      fill: "#4CAF50",
                    },
                  }}>
                  {planIDs.length > 0 ? (
                    planIDs.map((item, index) => {
                      console.log(item);
                      return (
                        <div key={index} className="plan">
                          <div className="planRow">
                            <div className="planColumn">
                              <h4 className="planName">{plans[item].plan_name}</h4>
                              <h2 className="planBalance">
                                &#8358;
                                {plans[item].balance
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </h2>
                              <div
                                className="planFundContainer"
                                style={{
                                  backgroundColor:
                                    plans[item].fund === 3
                                      ? "red"
                                      : plans[item].fund === 2
                                      ? "blue"
                                      : "#4caf50",
                                }}>
                                <h2 className="planFund">
                                  {plans[item].fund === 3
                                    ? "Aggressive"
                                    : plans[item].fund === 2
                                    ? "Balanced"
                                    : "Conservative"}
                                </h2>
                              </div>
                            </div>
                            <div className="progressContainer">
                              <div className="progressBarContainer">
                                <CircularProgressbar
                                  value={plans[item].balance}
                                  maxValue={plans[item].target}
                                  styles={buildStyles({
                                    pathColor: "#4caf50",
                                    trailColor: "#00000029",
                                  })}
                                  strokeWidth={15}
                                />
                              </div>
                              <div className="progressDetails">
                                <h2 className="progressPercentage">
                                  {~~((plans[item].balance / plans[item].target) * 100)}%
                                </h2>
                                <h5 className="progressTarget">
                                  of &#8358;
                                  {plans[item].target
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </h5>
                              </div>
                            </div>
                          </div>
                          <div className="moreRow">
                            <p
                              className="moreText"
                              onClick={() => {
                                setIsMore(true);
                                setIsCreating(true);
                                setItem(plans[item]);
                              }}>
                              More
                            </p>
                            <Down fill="#4caf50" />
                          </div>
                          <div className="matDateContainer">
                            <p className="matDate">
                              Maturity Date:{" "}
                              {format(parseISO(plans[item].maturity_date), "do MMMM, yyyy")}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h5>No plans yet</h5>
                  )}
                </Carousel>
              </div>
              <div className="changeCol">
                <div className="changeItem">
                  <h3
                    style={{ color: "#4caf50" }}
                    onClick={() => setIsTourOpen(true)}
                    className="change">
                    Start Tour
                  </h3>
                </div>
                <Button className="createPlanButton">
                  <div data-tut="first-step" className="newPlanItem">
                    <div className="plusCircle">
                      <p className="plusText">+</p>
                    </div>
                    <h3
                      onClick={() => {
                        setIsCreating(true);
                        setCreateState(0);
                      }}
                      className="change">
                      Create a new plan
                    </h3>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          <div className="kids" data-tut="second-step">
            <h3>Your Transactions</h3>
            <Table style={{ marginTop: "10px" }}>
              <thead className="transHead">
                <tr>
                  <td className="transBody transHeader"></td>
                  <td className="transBody transHeader">Date</td>
                  <td
                    style={{ padding: "0 35px", textAlign: "left" }}
                    className="transBody transHeader">
                    Description
                  </td>
                  <td className="transBody transHeader">Amount</td>
                  <td className="transBody transHeader">Balance</td>
                  <td className="transBody transHeader">Status</td>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  trans.map((item, index) => (
                    <tr style={{ textAlign: "center" }} key={index}>
                      <td className="transBody">
                        <div
                          style={{
                            width: "53px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "53px",
                            background: item.type === "credit" ? "#E4F3E5" : "#FCDDDD",
                            borderRadius: "8px",
                          }}>
                          {item.type === "credit" ? <Credit /> : <Debit />}
                        </div>
                      </td>
                      <td className="transBody">
                        <p className=" transDesc">
                          {format(parseISO(item.created_at), "dd-MM-yy")}
                        </p>
                      </td>
                      <td className="transBody" style={{ padding: "16px 35px", textAlign: "left" }}>
                        <p className="transDesc">
                          {item.description.split(" ").map(capitalize).join(" ")}
                        </p>
                      </td>
                      <td
                        style={{ color: item.type === "credit" ? "#4caf50" : "red" }}
                        className="transBody">
                        <p className="transAmount">&#8358;{item.amount}</p>
                      </td>
                      <td className="transBody">
                        <p className="transAmount">
                          &#8358;
                          {item.balance
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </p>
                      </td>
                      <td className="transBody">
                        <p
                          className="transStatus"
                          style={{
                            height: "41px",
                            backgroundColor:
                              item.status === "completed" || "successful"
                                ? "#E4F3E5"
                                : item.status === "denied"
                                ? "#FCDDDD"
                                : "#F9F3E1",
                            color:
                              item.status === "completed"
                                ? "#4caf50"
                                : item.status === "denied"
                                ? "#E81C1C"
                                : "#D4AF37",
                          }}>
                          {item.status.split(" ").map(capitalize).join(" ")}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <h5>No transactions yet</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="viewButtonContainer">
              <button onClick={() => setShowAll(!showAll)} className="viewButton">
                <p className="transHeader">
                  View {`${!showAll ? "More" : "Less"}`} <Down />
                </p>
              </button>
            </div>
          </div>
        </div>
      </AuthHOC>
      <Tour
        onRequestClose={closeTour}
        steps={tourConfig}
        isOpen={isTourOpen}
        // maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
      />
    </div>
  );
}
