import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useForm } from "react-hook-form";
import { Link, Element } from "react-scroll";
import { toast, ToastContainer } from "react-toastify";

import * as userActions from "../store/actions/user";
import * as ROUTES from "../routes/endpoints";
import { getReferrals } from "../store/actions/referrals";
import { getBankDetails } from "../store/actions/bank";

import { logout } from "../store/actions/auth";
import AuthHOC from "./authHOC";
import "react-tabs/style/react-tabs.css";
import "../assets/css/settings.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";

import LeftNav from "../components/LeftNav";

import { ReactComponent as Ref } from "../assets/svg/ref.svg";
import { ReactComponent as RefMail } from "../assets/svg/refMail.svg";
import { ReactComponent as RefWhatsapp } from "../assets/svg/refWhatsapp.svg";
import { ReactComponent as RefFB } from "../assets/svg/refFB.svg";
import { ReactComponent as CustomMail } from "../assets/svg/customMail.svg";
import { ReactComponent as CustomWA } from "../assets/svg/customWA.svg";
import { ReactComponent as CustomFB } from "../assets/svg/customFB.svg";
import { ReactComponent as CustomTG } from "../assets/svg/customTG.svg";
import { ReactComponent as CustomLI } from "../assets/svg/customLI.svg";
import { ReactComponent as CustomIG } from "../assets/svg/customIG.svg";
import { Button } from "../components/Button";

const copy = require("clipboard-copy");

export default function Settings() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const emailRegex = /^\S+@\S+\.\S+$/i;

  const user = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const logoutFxn = async () => {
    setIsLoading(true);
    await dispatch(logout());
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

  const {
    register: registerMessageForm,
    errors: errorsMessage,
    handleSubmit: messageFormSubmit,
  } = useForm();

  const onSendMessage = async (data) => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        userActions.userUpdate(ROUTES.EMAIL_CUSTOMER_SUPPORT, {
          name: data.name,
          email: data.email,
          message: data.message,
        })
      );
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onChangePassword = async (data) => {
    setIsLoading(true);
    try {
      const response = await dispatch(userActions.userUpdate(ROUTES.PASSWORD_UPDATE, { ...data }));
      // eslint-disable-next-line react/prop-types
      toast.success(`${response.msg}`);
    } catch (err) {
      toast.error(err.message);
      console.log("error message", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const faqHeaders = [
    "What is InvestNaira About?",
    "Why InvestNaira?",
    "Do you have an App?",
    "Who are your regulators?",
    "Are returns paid out monthly?",
    "What asset classes do you invest in?",
    "Can I fund my account regularly and at intervals?",
    "How can I fund my account?",
    "What's the minimum amount I can start saving with?",
    "What kind of Funds types are available?",
    "How do you make money?",
    "What are your returns on investment like?",
    "Does IN charge administrative fees?",
    "How safe is my investment?",
    "When and how can I withdraw?",
    "Is there a limit to the amount that can be invested or withdrawn?",
    "Why should I choose InvestNaira?",
    "Is InvestNaira Insured?",
    "How secured is my debit card if I use it for regular deposits?",
    "Can I withdraw before my investment maturity period?",
    "If  I am funding my account with N10,000 monthly and set my target at 3 years can you predict what it could give me?",
  ];

  const faqAnswers = [
    "InvestNaira is a platform that helps anyone build wealth for the long term by saving consitently, investing and re-investing returns (compounding)",
    "Our singular mission is to build wealth in our Nation and Africa, one at a time, to effect the change every one believes and work for it, day after day as Noah built the ark",
    "Yes, we have an app, download from our homepage",
    "We are registered with CAC and hold users investments through our cooperative license. Our payment partners are regulated entities who have the due liscences to operate in Nigeria.",
    "Returns are paid monthly for Conservative funds, Quarterly for Balanced funds and Yearly for Aggressive funds!",
    "We currently invest in Federal Government Bonds, International Currencies & Commodities & Firms solving problems with Technology.",
    "Yes, you can fund your account by setting up a recurring debit instruction which is automated or making one time deposit at intervals when you have excess (extra) funds!.",
    "You can fund your account using your Naira debit card or through mobile banking transfer. Deposit instructions are on your dashboard.",
    "You can start with as little as  N100 on a consistent basis",
    "Agggresive Funds - for the Risk Taker who is building for 3 years or more, Balanced Fund -for the moderate Risk Taker who is building for more than 1 years, Conservative Fund - for the Low Risk Taker who is just testing the waters for less than a year.",
    "We earn the excess of returns above what we are giving in each of the funds or plans used by our clients.",
    "Aggresive Fund is high risk with returns between 5% - 20% pa, Balanced Funds is Medium risk with returns between 7 & 10% pa. Conservative Fund is Low risk with a 10% pa. These are expected returns and the bands are for the lower and upper limts only.",
    "No fees on deposit or withdrawals.",
    "All investments come with a possibility of loss. However, we select only the highest quality, long term growing assets. So bottomline is, your investments are quite safe. We observe the first rule to 'never lose money and provide the highest standard of stewardship in managing your capital.",
    "Investments in any of the plans -Aggresive, Balanced or Conservate -with a fixed duration are locked until the plan expires. This ranges from 3 months, one year, 3 years and above.. Money in your wallet are available for withdrawal any time and only take 1- 3 business working days to be processed. Withdrawals are done through the website.",
    "There is currently no limit to the amount you can invest or withdraw. We want to build wealth with you for 3 generations. We are committed to building companies that would secure the futrure of your children and their children. This goal to build for three generations guides our ideals and informs our tenacity.",
    "We want to build wealth with you for 3 generations. We are committed to building com1anies that would secure the futrure of your children and their children. This goal to build for three generations guides our ideals and informs our tenacity.",
    "Our investments in bonds and treasuries are backed by the full faith and credit of the Federal Government of Nigeria. We screen all our other investment with decades of prefssional experience and due dilligence to avoid loss. We are registered and licensed on the Nigerian side as a cooperative with Lagos state government and so all our users and investments are required to be recorded and audited by the state. In the event of a liquidation the users accounts are credited with their investments back.",
    "We use bank-grade security, the cards are secured with partner organizations - Paystack and Flutterwave - who have the necessary securities in place!",
    "Terminating your investment comes with a penalty of 5%.",
    "We have a calculator on the website that gives you a guesstimate (not guaranteed) of what your networth (returns plus savings) over the duration of your long term goal. And each is based on the different funds - Aggresive, Conservative, Balanced!",
  ];

  return (
    <AuthHOC logout={logoutFxn}>
      <ToastContainer />
      <LeftNav />
      <div className="settings">
        <div className="settingsBox">
          <Tabs selectedTabClassName="activeTab">
            <TabList style={{ textAlign: "left" }}>
              <Tab style={{ padding: "29px 33px" }}>Authentication</Tab>
              <Tab style={{ padding: "29px 33px" }}>Referrals</Tab>
              <Tab style={{ padding: "29px 33px" }}>Customer Care</Tab>
              <Tab style={{ padding: "29px 33px" }}>FAQs</Tab>
            </TabList>
            <TabPanel>
              <form onSubmit={handleSubmit(onChangePassword)}>
                <div className="passwordRow">
                  <div className="settings-input-container">
                    <p className="settingHeaders">Email address</p>
                    <p style={{ width: "100%" }}>{user.email}</p>
                  </div>
                  <div className="settings-input-container">
                    <p className="settingHeaders">Current Password</p>
                    <input
                      placeholder="........................"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "........................")}
                      className={
                        errors.old_password
                          ? "input-error input-empty"
                          : "input-empty settingsField"
                      }
                      type="password"
                      name="password"
                      required
                      ref={register({ required: true })}
                    />
                    <span style={{ color: "#db7302" }}>
                      {errors.old_password && "Invalid Password"}
                    </span>
                  </div>
                </div>
                <div className="passwordRow">
                  <div className="settings-input-container">
                    <p className="settingHeaders">Change Password</p>
                    <input
                      placeholder="Set a new password"
                      onFocus={(e) => (e.target.placeholder = "")}
                      className={
                        errors.new_password
                          ? "input-error input-empty"
                          : "input-empty settingsField"
                      }
                      type="password"
                      name="new_password"
                      required
                      ref={register({ required: true })}
                    />
                    <span style={{ color: "#db7302" }}>
                      {errors.new_password && "Invalid Password"}
                    </span>
                  </div>
                  <div className="settings-input-container">
                    <p className="settingHeaders">Verify Password</p>
                    <input
                      placeholder="Verify new password"
                      onFocus={(e) => (e.target.placeholder = "")}
                      className={
                        errors.new_password_confirm
                          ? "input-error input-empty"
                          : "input-empty settingsField"
                      }
                      type="password"
                      name="new_password_confirm"
                      required
                      ref={register({ required: true })}
                    />
                    <span style={{ color: "#db7302" }}>
                      {errors.new_password_confirm && "Invalid Password"}
                    </span>
                  </div>

                  <div className="settings-input-container">
                    <Button
                      className="txt button settings-submit"
                      type="Submit"
                      title={isLoading ? "Loading..." : "Change Password"}
                    />
                  </div>
                </div>
              </form>
            </TabPanel>
            <TabPanel>
              {/* {referrals.length > 0 ? (
                referrals.map((user, index) => (
                  <h5 key={index}>{`${user.firstname} ${user.lastname}`}</h5>
                ))
              ) : (
                <h5>No Referrals yet</h5>
              )} */}
              <div className="refContainer">
                <div className="referrals">
                  <p className="referralsHeader">We value friendship!</p>
                  <p className="referralsText">
                    Refer your friends and get 3% of their deposit as bonus paid quarterly. You also
                    get higher interests on annual returns
                  </p>
                  <div className="settings-input-container" style={{ margin: 0 }}>
                    <p className="settingHeaders">Invite Link</p>
                    <div className="refRow">
                      <div className="wrap">
                        <input
                          id="refLink"
                          style={{ width: "100%" }}
                          value={`https://www.investnaira.com/signup/ref/${user.short_id}`}
                          className="settingsField"
                          disabled
                        />
                        <input
                          onClick={() =>
                            copy(`https://www.investnaira.com/signup/ref/${user.short_id}`)
                          }
                          className="settingsField settingsFieldButton"
                          type="button"
                          value="Copy"
                        />
                      </div>
                      <a
                        target="blank"
                        href={`mailto:?subject=Invest Naira Referral&body=https://www.investnaira.com/signup/ref/${user.short_id}`}
                        className="refIcon">
                        <RefMail />
                      </a>
                      <a
                        target="blank"
                        href={`https://api.whatsapp.com/send?text=https://www.investnaira.com/signup/ref/${user.short_id}`}
                        className="refIcon">
                        <RefWhatsapp />
                      </a>
                      <a
                        target="blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://www.investnaira.com/signup/ref/${user.short_id}`}
                        className="refIcon">
                        <RefFB />
                      </a>
                    </div>
                  </div>
                </div>
                <Ref />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="refContainer">
                <div className="referrals">
                  <p className="referralsHeader">Contact Us</p>
                  <p className="referralsText">
                    Feel free to contact us at any time. We will get back to you before you know it!
                  </p>
                  <div className="settings-input-container" style={{ margin: 0 }}>
                    <p className="settingHeaders">Reach us on our social media platforms</p>
                    <div className="refRow">
                      <div className="customerCareIcon">
                        <a target="blank" href="mailto:invest@investnaira.com">
                          <CustomMail />
                        </a>
                      </div>
                      <div className="customerCareIcon">
                        <a target="blank" href="https://api.whatsapp.com/send?phone=2349051667728">
                          <CustomWA />
                        </a>
                      </div>
                      <div className="customerCareIcon">
                        <a target="blank" href="https://www.messenger.com/t/investnaira">
                          <CustomFB />
                        </a>
                      </div>
                      <div className="customerCareIcon">
                        <a target="blank" href="https://t.me/InvestNaira">
                          <CustomTG />
                        </a>
                      </div>
                      <div className="customerCareIcon">
                        <a target="blank" href="https://www.linkedin.com/company/investnaira/">
                          <CustomLI />
                        </a>
                      </div>
                      <div className="customerCareIcon">
                        <a target="blank" href="https://www.instagram.com/investnaira">
                          <CustomIG />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="customForm" onSubmit={messageFormSubmit(onSendMessage)}>
                  <div className="settings-input-container" style={{ width: "80%" }}>
                    <p className="settingHeaders">Name</p>
                    <input
                      value={`${user.firstname} ${user.lastname}`}
                      onFocus={(e) => (e.target.placeholder = "")}
                      className={
                        errorsMessage.name ? "input-error input-empty" : "input-empty settingsField"
                      }
                      cols="40"
                      type="text"
                      name="name"
                      ref={registerMessageForm({ required: true })}
                      required
                    />
                  </div>
                  <div className="settings-input-container" style={{ width: "80%" }}>
                    <p className="settingHeaders">Email address</p>
                    <input
                      value={user.email}
                      onFocus={(e) => (e.target.placeholder = "")}
                      className={
                        errorsMessage.email
                          ? "input-error input-empty"
                          : "input-empty settingsField "
                      }
                      type="email"
                      name="email"
                      cols="40"
                      ref={registerMessageForm({ required: true, pattern: emailRegex })}
                      required
                    />
                  </div>
                  <div className="settings-input-container" style={{ width: "80%" }}>
                    <p className="settingHeaders">Message</p>
                    <input
                      placeholder="Type your message here..."
                      onFocus={(e) => (e.target.placeholder = "")}
                      className={
                        errorsMessage.old_password
                          ? "input-error input-empty"
                          : "input-empty settingsField"
                      }
                      name="message"
                      ref={registerMessageForm({ required: true })}
                      cols="40"
                      rows="5"
                    />
                  </div>
                  <div
                    style={{ width: "84%", marginTop: "10px", justifyContent: "center" }}
                    className="settings-input-container">
                    <Button
                      style={{ width: "100%" }}
                      className="txt button settings-submit"
                      type="Submit"
                      title={isLoading ? "SENDING..." : "SEND MESSAGE"}
                    />
                  </div>
                </form>
              </div>
            </TabPanel>
            <TabPanel style={{ height: "100%" }}>
              <div className="faqContainer">
                <div className="faqHeaders">
                  {faqHeaders.map((item, index) => (
                    <Link
                      containerId="answers"
                      activeClass="active"
                      className="question"
                      to={item}
                      spy={true}
                      smooth={true}
                      offset={-10}
                      duration={500}
                      key={index}>
                      <p className="faqHeader">{item}</p>
                    </Link>
                  ))}
                </div>
                <div id="answers" className="faqDetails">
                  {faqAnswers.map((item, index) => (
                    <Element name={faqHeaders[index]}>
                      <p
                        style={{ marginBottom: 0, fontSize: "18px" }}
                        className="faqHeader"
                        key={index}>
                        {faqHeaders[index]}
                      </p>
                      <p style={{ marginTop: 0 }} className="faq" key={index}>
                        {item}
                      </p>
                    </Element>
                  ))}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </AuthHOC>
  );
}
