import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useForm } from "react-hook-form";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import * as campaignActions from "../store/actions/campaigns";
import * as walletActions from "../store/actions/wallet";

import Nav from "../components/Navbar";
import Navbar from "../components/Navbar/Navbar";
import "react-tabs/style/react-tabs.css";
import "../assets/css/settings.css";
import "../assets/css/converge.css";
import "../assets/css/wallet.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";

import { Button } from "../components/Button";
import { ReactComponent as BoundedLogo } from "../assets/svg/boundedLogo.svg";
import { ReactComponent as Stocks } from "../assets/svg/stocks.svg";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as Close } from "../assets/svg/close.svg";
import { ReactComponent as Ref } from "../assets/svg/ref.svg";
import { ReactComponent as RefMail } from "../assets/svg/refMail.svg";
import { ReactComponent as RefWhatsapp } from "../assets/svg/refWhatsapp.svg";
import { ReactComponent as RefTelegram } from "../assets/svg/telegram.svg";
import { ReactComponent as RefFB } from "../assets/svg/refFB.svg";

const copy = require("clipboard-copy");

export default function Overview() {
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [isModalOpen, setIsModalOpen] = useState(1);
  const [amount, setAmount] = useState(200);
  const [first, setFirst] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [frequency] = useState(null);
  const [saveCard, setSaveCard] = useState("false");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [item, setItem] = useState({});

  const getCampaign = useCallback(async () => {
    try {
      const response = await dispatch(campaignActions.getByShortId(path));
      await setItem(response);
      await setSelectedCampaign(item.id);
      console.log(item);
    } catch (err) {
      if (err.message.includes("Authentication Error")) {
        await console.log(err);
      }
    }
  }, [dispatch, item, path]);

  useEffect(() => {
    getCampaign();
  }, [getCampaign]);

  const config = {
    public_key: "FLWPUBK_TEST-64eb4450bf7994c46e935879442cfbc0-X",
    tx_ref: `ca${Math.floor(Math.random() * 10000000000000000)}`,
    amount: parseInt(amount),
    payment_plan: frequency,
    currency: "NGN",
    production: true,
    payment_options: "card,mobilemoney,ussd,account,banktransfer",
    customer: {
      email: email,
      phonenumber: phone,
      name: `${first}`,
    },
    meta: { saveCard: saveCard, campaign: selectedCampaign },
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

  const onQuickTransfer = async (data) => {
    setIsLoading(true);
    try {
      if (!data.fundSource) {
        console.log("amounts", selectedCampaign, config);
        setSaveCard("true");
        await initializePayment();
      } else {
        const response = await dispatch(
          walletActions.chargeCard({
            amount: data.amount,
            card_id: data.fundSource,
            password: data.password,
            plan_id: selectedCampaign,
          })
        );
        toast.success(response.msg);
      }
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <Nav />
      <Navbar />
      {isModalOpen === 2 ? (
        <div className="modalBackground" style={{ width: "100vw" }}>
          <Logo width={57} height={66} />
          <div className="transferContainer">
            <div className="transferHeader">
              <p className="transferHead">Spread the word</p>
              <Close style={{ cursor: "pointer" }} onClick={() => setIsModalOpen(1)} />
            </div>
            <p className="transferDetails">Inform others of their fundraisers</p>
            <div className="shareModal">
              <Ref />
              <div className="settings-input-container" style={{ marginTop: "20px", width: "85%" }}>
                <div className="wrap" style={{ width: "100%" }}>
                  <input
                    id="refLink"
                    value={`https://www.investnaira.com/converge/${item.short_id}`}
                    className="settingsField"
                    disabled
                  />
                  <input
                    onClick={() => {
                      copy(`https://www.investnaira.com/converge/${item.short_id}`);
                      toast.success("Link copied successfully");
                    }}
                    className="settingsField settingsFieldButton"
                    type="button"
                    value="Copy"
                  />
                </div>
                <div
                  className="refRow"
                  style={{ justifyContent: "space-between", marginTop: "20px" }}>
                  <a
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    href={`mailto:?subject=Invest Naira Referral&body=Support ${item.name} to make this a possibility. Converge is helping to raise funds for the causes that you care most about. GIVE. SHARE. CONVERGE. Click on the link to support. https://www.investnaira.com/converge/${item.short_id}`}
                    className="refIcon">
                    <RefMail />
                  </a>
                  <a
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    href={`https://api.whatsapp.com/send?text=Support ${item.name} to make this a possibility. Converge is helping to raise funds for the causes that you care most about. Let us converge here -  https://www.investnaira.com/converge/${item.short_id}. GIVE. SHARE. CONVERGE.`}
                    className="refIcon">
                    <RefWhatsapp />
                  </a>
                  <a
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    href={`tg://msg_url?url=https://www.investnaira.com/converge/${item.short_id}&text=Support ${item.name} to make this a possibility. Converge is helping to raise funds for the causes that you care most about. GIVE. SHARE. CONVERGE.`}
                    className="refIcon">
                    <RefTelegram />
                  </a>
                  <a
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://www.investnaira.com/converge/${item.short_id}&quote=Support ${item.name} to make this a possibility. Converge is helping to raise funds for the causes that you care most about. GIVE. SHARE. CONVERGE.`}
                    className="refIcon">
                    <RefFB />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isModalOpen === 3 ? (
        <div className="modalBackground" style={{ width: "100vw" }}>
          <div className="transferContainer" style={{ border: "none" }}>
            <div className="transferHeader">
              <p className="transferHead">Support the cause</p>
              <Close style={{ cursor: "pointer" }} onClick={() => setIsModalOpen(1)} />
            </div>
            <p className="transferDetails">Donate to a fund</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="convergeHeader">
                <BoundedLogo />
                <div style={{ textAlign: "left", marginLeft: "20px" }}>
                  <p
                    className="convergeOverviewHeader"
                    style={{ color: item.color_code, margin: 0, fontSize: 21 }}>
                    {item.name}
                  </p>
                  {/* <p className="tabHeader" style={{ fontSize: 9 }}>
                    Organizer - {`${item.user.firstname} ${item.user.lastname}`}
                  </p> */}
                </div>
              </div>
            </div>
            <p className="walletDesc">Name</p>
            <input
              placeholder={`Name`}
              onChange={(e) => setFirst(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              className={"chooseCard"}
              style={{
                fontSize: "14px",
                width: "100%",
              }}
              name="firstName"
              type="text"
              required
              ref={register}
            />
            <p className="walletDesc">Email</p>
            <input
              placeholder={`user@gmail.com`}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              className={"chooseCard"}
              style={{
                fontSize: "14px",
                width: "100%",
              }}
              name="email"
              type="email"
              required
              ref={register}
            />
            <p className="walletDesc">Phone Number</p>
            <input
              placeholder={`Phone Number`}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              className={"chooseCard"}
              style={{
                fontSize: "14px",
                width: "100%",
              }}
              name="phone"
              type="number"
              required
              ref={register}
            />

            <p className="walletDesc">Amount</p>
            <input
              placeholder={`\u20A6 0.00`}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              className={"chooseCard"}
              style={{
                fontSize: "14px",
                width: "100%",
              }}
              name="amount"
              type="number"
              required
              ref={register}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={async () => {
                  setIsLoading(true);
                  const validate = await trigger();
                  const data = await getValues();

                  await onQuickTransfer(data);
                  console.log("validate", validate, "data", data);
                }}
                style={{ cursor: "pointer" }}
                className="transferButton"
                title={isLoading ? "Loading..." : "Fund Campaign"}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="settings conover">
          <div className="conContainer">
            <div
              className="convergeOverviewBackground"
              style={{ backgroundImage: `url(${item.cover_pic})` }}></div>
            <div
              style={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                height: "100%",
                paddingLeft: "30px",
                color: "white",
              }}>
              {/* <p className="convergeOverviewHeader">{item.name}</p> */}
            </div>
          </div>
          <div className="convergeContainer">
            <div className="convergeBox">
              <div className="convergeHeader">
                <img src={item.logo_pic} alt="logo" className="logo_pic" />
                <div style={{ textAlign: "left", marginLeft: "20px" }}>
                  <p
                    className="convergeOverviewHeader"
                    style={{ color: item.color_code, margin: 0 }}>
                    {item.name}
                  </p>
                  {/* <p className="tabHeader">
                    Organizer - {`${item.user.firstname} ${item.user.lastname}`}
                  </p> */}
                </div>
              </div>
              <Tabs selectedTabClassName="activeConverge" selected>
                <TabList style={{ textAlign: "left", borderBottom: 0, color: "#707070" }}>
                  <Tab style={{ padding: "29px 33px 29px 0" }}>
                    <p className="tabHeader">Overview</p>
                  </Tab>
                </TabList>
                <TabPanel>
                  <div className="conFundDetails">
                    <div>
                      <p className="tabHeader">{item.description}</p>
                    </div>
                    <div className="conFundSubmit">
                      <Button
                        className="txt button convergeSubmit"
                        type="Submit"
                        title="DONATE NOW"
                        style={{
                          backgroundColor: item.color_code,
                          border: `1px solid ${item.color_code}`,
                        }}
                        onClick={() => setIsModalOpen(3)}
                      />
                      <Button
                        className="txt button convergeSubmit greyedOut"
                        type="Submit"
                        title="SHARE"
                        onClick={() => setIsModalOpen(2)}
                      />
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
            <div className="donationBox">
              <div className="convergeContainer" style={{ justifyContent: "flex-start" }}>
                <p className="raisedAmount" style={{ color: item.color_code }}>
                  &#8358;{`${item.balance} `}
                </p>
                <p className="tabHeader" style={{ position: "relative", top: "5px", left: "5px" }}>
                  Raised of &#8358;{`${new Intl.NumberFormat().format(item.target)} goal`}
                </p>
              </div>
              <div
                className="donationDivider"
                style={{
                  backgroundColor: item.color_code,
                  border: `1px solid ${item.color_code}`,
                }}
              />
              <div className="fundDetailsContainer" style={{ marginBottom: "20px" }}>
                <div className="textConOverView">
                  <p className="fundHeaderText">&#8358; {item.balance}</p>
                  <p className="fundDesc fundDescText">Raised</p>
                </div>
                <div className="textConOverView">
                  <p className="fundHeaderText">{item.trxCount}</p>
                  <p className="fundDesc fundDescText">Funders</p>
                </div>
                <div>
                  <p className="fundHeaderText">&#8358; 100</p>
                  <p className="fundDesc fundDescText">Min. Amt.</p>
                </div>
              </div>
              <div
                className="convergeContainer"
                style={{ justifyContent: "flex-start", marginBottom: "20px" }}>
                <Stocks fill="red" />
                <p
                  className="raisedAmount"
                  style={{ fontSize: "18px", marginLeft: "20px", color: item.color_code }}>
                  {item.trxCount} people just donated
                </p>
              </div>
              <div className="donationButtons">
                <Button
                  className="txt button convergeSubmit donation"
                  type="Submit"
                  title="DONATE NOW"
                  style={{
                    backgroundColor: item.color_code,
                    border: `1px solid ${item.color_code}`,
                  }}
                  onClick={() => setIsModalOpen(3)}
                />
                <Button
                  className="txt button convergeSubmit donation greyedOut"
                  type="Submit"
                  title="SHARE"
                  onClick={() => setIsModalOpen(2)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
