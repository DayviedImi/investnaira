import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import StickyBox from "react-sticky-box";
import Tour from "reactour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { toast, ToastContainer } from "react-toastify";

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

import * as userActions from "../store/actions/user";
import * as walletActions from "../store/actions/wallet";
import * as virtualActions from "../store/actions/virtualAcct";
import * as ROUTES from "../routes/endpoints";
import { getReferrals } from "../store/actions/referrals";
import { getBankDetails } from "../store/actions/bank";

import { logout } from "../store/actions/auth";
import { frequencyDropdown } from "../utils/helperFxns";
import AuthHOC from "./authHOC";
import "../assets/css/dashboard.css";
import "../assets/css/wallet.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";

import LeftNav from "../components/LeftNav";
import { Card, Table } from "@material-ui/core";

import { ReactComponent as Credit } from "../assets/svg/Transfer Credit.svg";
import { ReactComponent as Debit } from "../assets/svg/Transfer Debit.svg";
import { ReactComponent as Money } from "../assets/svg/money-bill-wave.svg";
import { ReactComponent as DebitCard } from "../assets/svg/credit-card.svg";
import { ReactComponent as Add } from "../assets/svg/Add Icon.svg";
import { ReactComponent as Down } from "../assets/svg/chevron-down.svg";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as Close } from "../assets/svg/close.svg";
import { ReactComponent as Check } from "../assets/svg/checkMark.svg";
import { ReactComponent as WalletIcon } from "../assets/svg/coloredWallet.svg";

import { Button } from "../components/Button";

export default function Wallet() {
  const WITHDRAW = "Withdraw";
  const TRANSFER = "Fund Plan";
  const FUNDWALLET = "Fund Wallet";
  const ADDCARD = "Add Card";
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const virtualBankAccount = useSelector((state) => state.virtualAcct);
  const wallet = useSelector((state) => state.wallet);
  const plans = useSelector((state) => state.plans);
  const cards = useSelector((state) => state.debitCards);
  const transactions = useSelector((state) => state.transactions);
  // const kids = useSelector((state) => state.children);

  const planIDs = Object.keys(plans);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(1);
  const logoutFxn = async () => {
    setIsLoading(true);
    await dispatch(logout());
  };

  const [amount, setAmount] = useState(200);
  const [bvn, setBvn] = useState();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [saveCard, setSaveCard] = useState("false");

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const config = {
    public_key: "FLWPUBK-2ea259aca6c035b2b461e8d07a766091-X",
    tx_ref: `rv${Math.floor(Math.random() * 10000000000000000)}`,
    amount: parseInt(amount),
    // payment_plan: frequency,
    currency: "NGN",
    production: true,
    payment_options: "card,mobilemoney,ussd,account,banktransfer",
    customer: {
      email: user.email,
      phonenumber: user.phone_no,
      name: `${user.firstname} ${user.lastname}`,
    },
    meta: { saveCard: saveCard, plan: selectedPlan },

    // meta: [
    //   { metaname: "saveCard", metavalue: saveCard }, //should be a string as true would be converted to '1'
    //   { metaname: "plan", metavalue: selectedPlan },
    // ],
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

  const { register, trigger, getValues } = useForm();

  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      // console.log("fetching user dispatch");
      await dispatch(userActions.getDashboard(ROUTES.DASHBOARD_GET));
      dispatch(getReferrals()); //TODO: can separate out the different requests to when they are needed
      dispatch(getBankDetails());
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.message.includes("Authentication Error")) {
        await dispatch(logout());
      }
    }
  }, [dispatch]);

  const onQuickAction = async (data) => {
    // console.log("data", data);
    setIsLoading(true);
    try {
      if (title === FUNDWALLET && data.fundSource === "new") {
        // console.log("amounts", selectedPlan, amount, data.amount);
        setSaveCard("true");
        await initializePayment();
      } else {
        const actionToDispatch =
          title === WITHDRAW
            ? walletActions.createWithdrawal({
                amount: data.amount,
                reason: data.reason,
                password: data.password,
              })
            : title === TRANSFER
            ? walletActions.createTransfer({
                amount: data.amount,
                source: "wallet",
                sourceID: wallet.wallet_id,
                destination: "plan",
                destinationID: selectedPlan,
                password: data.password,
              })
            : title === FUNDWALLET
            ? walletActions.chargeCard({
                amount: data.amount,
                card_id: data.fundSource,
                password: data.password,
              })
            : null;
        const response = await dispatch(actionToDispatch);
        // console.log("response", response, response.msg);
        toast.success(response.msg);
        setIsModalOpen(4);
      }
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  const onQuickTransfer = async (data) => {
    // console.log("data", data);
    setIsLoading(true);
    try {
      if (data.fundSource === "new") {
        // console.log("amounts", selectedPlan, flutterwaveConfig);
        setSaveCard("true");
        await initializePayment();
      } else {
        const response = await dispatch(
          walletActions.chargeCard({
            amount: data.amount,
            card_id: data.fundSource,
            password: data.password,
            plan_id: selectedPlan,
          })
        );
        toast.success(response.msg);
        setIsModalOpen(4);
      }
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  const trans = !showAll ? transactions.slice(0, 5) : transactions;

  const tourConfig = [
    {
      selector: "[data-tut='third-step']",
      content: "Withdraw: Transfer funds in your IN wallet to your bank account",
    },
    {
      selector: "[data-tut='fourth-step']",
      content: "Transfer: Move funds from your wallet to an investment plan",
    },
    {
      selector: "[data-tut='fifth-step']",
      content: "Fund wallet: Top up your IN wallet",
    },
    // ...
  ];

  const accentColor = "#4CAF50";

  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

  const closeTour = () => {
    setIsTourOpen(false);
  };

  const quickActions = [
    {
      number: "fourth",
      icon: <Money width={"24px"} height={"17px"} />,
      text: TRANSFER,
      subText: "Transfer money from your wallet to your plans",
    },
    {
      number: "fifth",
      icon: <DebitCard width={"22px"} height={"17px"} />,
      text: FUNDWALLET,
      subText: "Fund your wallet via your card, bank transfer and more",
    },
    {
      number: "third",
      icon: <Money width={"24px"} height={"17px"} />,
      text: WITHDRAW,
      subText: "Withdraw money from your wallet to your bank account",
    },
    {
      number: "sixth",
      icon: <Add width={"24px"} height={"17px"} />,
      text: ADDCARD,
      subText: "Withdraw money from your wallet to your bank account",
    },
  ];

  const clickFunction4 = () => {
    setIsModalOpen(3);
    setSaveCard("true");
  };
  const clickFunction = (qa) => {
    setSelectedPlan(null);
    setTitle(qa.text);
    setSubTitle(qa.subText);
    setIsModalOpen(2);
  };
  console.log("user", virtualBankAccount);
  return (
    <AuthHOC logout={logoutFxn}>
      <ToastContainer />
      <LeftNav />
      {isModalOpen === 2 ? (
        <div className="modalBackground">
          <Logo width={57} height={66} />
          <div className="transferContainer" style={{ height: title === TRANSFER ? "" : "70%" }}>
            <div className="transferHeader">
              <p className="transferHead">{title}</p>
              <Close style={{ cursor: "pointer" }} onClick={() => setIsModalOpen(1)} />
            </div>
            <p className="transferDetails">{subTitle}</p>
            <p className="transferLabel">From</p>
            {title === FUNDWALLET ? (
              cards.length > 0 ? (
                <select className="chooseCard" name="fundSource" ref={register}>
                  <option value="new">New Card/Bank Account</option>
                  {cards.map((item, index) => (
                    <option key={index} value={item.id}>
                      {`${item.first_6digits
                        .replace(/(\d{4})/g, "$1 ")
                        .replace(/(^\s+|\s+$)/, "")}** **** ${item.last_4digits}`}
                    </option>
                  ))}
                </select>
              ) : (
                <select className="chooseCard" name="fundSource" ref={register}>
                  <option value="new">New Card/Bank Account</option>
                </select>
              )
            ) : (
              <div className="chooseCard transRow">
                <div className="cardContainer">
                  <WalletIcon fill={"#4caf50"} width={27} height={27} />
                  <div
                    style={{
                      marginLeft: "10px",
                    }}>
                    <p className="cardNumber" style={{ color: "#4caf50" }}>
                      Wallet
                    </p>
                  </div>
                </div>
                <Down />
              </div>
            )}
            <p className="transferLabel">Amount</p>
            <input
              placeholder={`\u20A6 0.00`}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              className={"chooseCard"}
              name="amount"
              type="number"
              required
              ref={register}
            />
            {title === FUNDWALLET && (
              <div className="walletCont">
                <p className="transferLabel">Saving frequency</p>
                <select
                  name="frequency"
                  className="chooseCard"
                  defaultValue={1}
                  onChange={(e) => {
                    // setFrequency(e.target.options[e.target.selectedIndex].id);
                  }}
                  ref={register({ required: true })}>
                  {frequencyDropdown.map((item, index) => (
                    <option
                      className="createInput"
                      key={item.id}
                      id={item.payment_plan}
                      value={item.id}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <p className="transferLabel">Login Password</p>
            <input
              ref={register({ required: true })}
              onFocus={(e) => (e.target.placeholder = "")}
              className="chooseCard"
              name="password"
              type="password"
              placeholder={`*******`}
            />
            {title === TRANSFER ? (
              <div>
                <p className="transferLabel">Choose Destination</p>
                <StickyBox>
                  <div className="transferkidsContainer">
                    {planIDs.length > 0 ? (
                      planIDs.map((item, index) => (
                        <div
                          style={{
                            cursor: "pointer",
                            padding: "10px!important",
                            transform: selectedPlan === item && "scale(1.04)",
                          }}
                          key={index}
                          className="kidContainer"
                          onClick={async () => {
                            setSelectedPlan(item);
                            // toast.error(`${item} ${plans[item].plan_name} was selected`);
                          }}>
                          <Money width={"24px"} height={"17px"} />
                          <p
                            style={{
                              color: selectedPlan === item && "#4CAF50",
                              fontWeight: selectedPlan === item && "bolder",
                            }}
                            className="kidName">
                            {" "}
                            {`${plans[item].plan_name}`}
                          </p>
                        </div>
                      ))
                    ) : (
                      <h5>No plans yet</h5>
                    )}
                  </div>
                </StickyBox>
              </div>
            ) : (
              <div>
                {title === WITHDRAW && (
                  <div>
                    <p className="transferLabel">Reason</p>
                    <input
                      ref={register()}
                      onFocus={(e) => (e.target.placeholder = "")}
                      className={"chooseCard"}
                      name="reason"
                    />
                  </div>
                )}
              </div>
            )}
            <div className="transferModalButton">
              <Button
                onClick={async () => {
                  setIsLoading(true);
                  await trigger();
                  const data = await getValues();
                  await onQuickAction(data);
                }}
                title={isLoading ? "Loading..." : title}
                type="submit"
                className="profile_button signup_button transButton"
              />
            </div>
          </div>
        </div>
      ) : isModalOpen === 3 ? (
        <div className="modalBackground">
          <Logo width={57} height={66} />
          <div className="transferContainer" style={{ height: "40%" }}>
            <div className="transferHeader">
              <p className="transferHead">Save Card</p>
              <Close
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsModalOpen(1);
                }}
              />
            </div>

            <p className="transferDetails">
              {`You need to perform a transaction of at least \u20A6 100 so our payment partner
              can save your card for future transactions. The money from your transaction goes to your wallet`}
            </p>
            <p className="transferDetails">
              {`Note: For security reasons, we do not store your card details on our servers`}
            </p>

            <p className="transferLabel">Amount</p>
            <input
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`\u20A6 0.00`}
              onFocus={(e) => (e.target.placeholder = "")}
              className={"chooseCard"}
            />

            <div className="transferModalButton">
              <Button
                onClick={() => {
                  setSaveCard("true");
                  initializePayment();
                }}
                title="Pay to Save Card"
                type="submit"
                className="profile_button signup_button transButton"
              />
            </div>
          </div>
        </div>
      ) : isModalOpen === 4 ? (
        <div className="modalBackground">
          <Logo width={57} height={66} />
          <div className="transferContainer transCont" style={{ height: "40%" }}>
            <div style={{ width: "100%", textAlign: "right" }}>
              <Close
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsModalOpen(1);
                }}
              />
            </div>
            <Check />
            <p className="doneText">Your transaction has been successfully completed</p>
          </div>
        </div>
      ) : (
        <div className="homepage">
          <div className="actionsContainer">
            <div className="halfActions">
              <div
                id="add_row"
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: window.innerWidth < 1000 ? "center" : "flex-start",
                  width: "100%",
                }}>
                <div className="addCard">
                  <h5 className="addCardText">Virtual Account</h5>
                  {virtualBankAccount.bank_name ? (
                    <div>
                      <p className="addTexts">{`Bank Name: ${virtualBankAccount.bank_name}`}</p>
                      <p className="addTexts">{`Account Name: ${virtualBankAccount.account_name}`}</p>
                      <p className="addTexts">{`Account Number: ${virtualBankAccount.account_no}`}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="walletTexts" style={{ width: "90%", textAlign: "center" }}>
                        Please enter your BVN to request for a virtual account
                      </p>
                      <input
                        placeholder={`BVN`}
                        onChange={(e) => setBvn(e.target.value)}
                        onFocus={(e) => (e.target.placeholder = "")}
                        className={"amountCard"}
                        style={{
                          height: "calc(0.05 * 100vh)",
                          width: "100%",
                          fontSize: "12px",
                        }}
                        name="bvn"
                        type="number"
                        required
                        ref={register}
                      />

                      <Button
                        onClick={async () => {
                          setIsLoading(true);
                          // await dispatch(virtualActions.createVirtualAcct(bvn));
                          try {
                            const response = await dispatch(virtualActions.createVirtualAcct(bvn));
                            console.log("res", response.msg);
                            toast.success(response.msg);
                          } catch (err) {
                            setIsLoading(false);
                            toast.error(err.message);
                          }
                        }}
                        style={{ cursor: "pointer", marginLeft: "20px" }}
                        className="addButton"
                        title={isLoading ? "Loading..." : "REQUEST ACCOUNT"}
                      />
                    </div>
                  )}
                </div>
                <div className="walletActionsContainer">
                  <p className="walletTexts">Wallet Balance</p>
                  <h3 className="netWorthValue" style={{ fontSize: "41px" }}>
                    &#8358;{wallet.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </h3>
                  <p className="walletTexts">
                    Your wallet contains uninvested funds which can be transferred to any of your
                    plans
                  </p>
                  <div className="quickActionsContainer">
                    {quickActions.map((item, index) => (
                      <Card
                        data-tut={`${item.number}-step`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          item.text === "Add Card" ? clickFunction4() : clickFunction(item)
                        }
                        key={index}
                        className="quickAction">
                        {item.icon}
                        <p className="quickActionText">{item.text}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              <div className="quickTransferContainer">
                <h5 className="quick">Quick Transfer</h5>
                <p className="transferDetails">
                  Transfer right from your bank account/card to your plan
                </p>

                <div className="quickTransferRow">
                  <div>
                    <p className="walletDesc">Choose Card</p>
                    {cards.length > 0 ? (
                      <select className="chooseCard" name="fundSource" ref={register}>
                        <option value="new">New Card/Bank Account</option>
                        {cards.map((item, index) => (
                          <option key={index} value={item.id}>
                            {`${item.first_6digits
                              .replace(/(\d{4})/g, "$1 ")
                              .replace(/(^\s+|\s+$)/, "")}** **** ${item.last_4digits}`}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select className="chooseCard" name="fundSource" ref={register}>
                        <option value="new">New Card/Bank Account</option>
                      </select>
                    )}
                    <p className="walletDesc">Saving frequency</p>
                    <select
                      name="frequency"
                      className="chooseCard"
                      defaultValue={1}
                      onChange={(e) => {
                        // setFrequency(e.target.options[e.target.selectedIndex].id);
                        // console.log(frequency);
                      }}
                      ref={register({ required: true })}>
                      {frequencyDropdown.map((item, index) => (
                        <option
                          className="createInput"
                          key={item.id}
                          id={item.payment_plan}
                          value={item.id}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="amountBox">
                    <p className="walletDesc">Amount</p>
                    <input
                      placeholder={`\u20A6 0.00`}
                      onChange={(e) => setAmount(e.target.value)}
                      onFocus={(e) => (e.target.placeholder = "")}
                      className={"amountCard"}
                      style={{
                        height: "calc(0.05 * 100vh)",
                        fontSize: "12px",
                      }}
                      name="amount"
                      type="number"
                      required
                      ref={register}
                    />
                    <p className="walletDesc">Login Password</p>
                    <input
                      placeholder={`*****`}
                      onFocus={(e) => (e.target.placeholder = "")}
                      className={"amountCard"}
                      style={{
                        fontSize: "12px",
                        height: "calc(0.05 * 100vh)",
                      }}
                      type="password"
                      name="password"
                      ref={register}
                    />
                  </div>
                </div>
                <p className="walletDesc">Choose Destination</p>
                <div className="quickTransferRow">
                  <StickyBox>
                    <div className="kidsContainer">
                      {planIDs.length > 0 ? (
                        planIDs.map((item, index) => (
                          <div
                            style={{
                              cursor: "pointer",
                              padding: "10px!important",
                              transform: selectedPlan === item && "scale(1.04)",
                            }}
                            key={index}
                            className="kidContainer"
                            onClick={async () => {
                              setSelectedPlan(item);
                              // toast.error(`${item} ${plans[item].plan_name} was selected`);
                            }}>
                            <Money width={"24px"} height={"17px"} />
                            <p
                              style={{
                                color: selectedPlan === item && "#4CAF50",
                                fontWeight: selectedPlan === item && "bolder",
                              }}
                              className="kidName">
                              {" "}
                              {`${plans[item].plan_name}`}
                            </p>
                          </div>
                        ))
                      ) : (
                        <h5>No plans yet</h5>
                      )}
                    </div>
                  </StickyBox>
                  <Button
                    onClick={async () => {
                      setIsLoading(true);
                      await trigger();
                      const data = await getValues();

                      await onQuickTransfer(data);
                      // console.log("validate", validate, "data", data);
                    }}
                    style={{ cursor: "pointer" }}
                    className="transferButton"
                    title={isLoading ? "Loading..." : TRANSFER}
                  />
                </div>
              </div>
            </div>
            <div className="kids">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <h3>Your Transactions</h3>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsTourOpen(true)}
                  className="transBody">
                  Start Tour
                </p>
              </div>
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
                        <td className="transBody transDesc">
                          {format(parseISO(item.created_at), "dd-MM-yy")}
                        </td>
                        <td
                          className="transBody transDesc"
                          style={{ padding: "16px 35px", textAlign: "left" }}>
                          {item.description.split(" ").map(capitalize).join(" ")}
                        </td>
                        <td
                          style={{ color: item.type === "credit" ? "#4caf50" : "red" }}
                          className="transBody transAmount">
                          &#8358; {item.amount}
                        </td>
                        <td className="transBody transAmount">&#8358; {item.balance.toFixed(2)}</td>
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
        </div>
      )}
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
    </AuthHOC>
  );
}
