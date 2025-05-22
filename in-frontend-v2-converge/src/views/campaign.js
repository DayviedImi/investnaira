import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import * as userActions from "../store/actions/user";
import * as ROUTES from "../routes/endpoints";
import * as LINKS from "../routes/routes";
import { createCampaign } from "../store/actions/campaigns";
import { getBankDetails } from "../store/actions/bank";
import { getReferrals } from "../store/actions/referrals";

import { ReactComponent as Arrow } from "../assets/svg/arrow_right.svg";

import { logout } from "../store/actions/auth";
import AuthHOC from "./authHOC";
import "react-tabs/style/react-tabs.css";
import "../assets/css/settings.css";
import "../assets/css/converge.css";
import "../assets/css/wallet.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";

import LeftNav from "../components/LeftNav";

export default function Campaign() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(0);
  const [sector, setSector] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [target, setTarget] = useState("");
  const [color_code, setColor] = useState("#4CAF50");
  const [maturity_date, setDate] = useState("");
  const [maturity_trigger, setTrigger] = useState("");
  // const [organizer, setOrganizer] = useState("");
  // const [team, setTeam] = useState("");
  const [cover_pic, setCover] = useState("");
  // const [supporting_docs, setDocs] = useState("");
  const [logo_pic, setLogo] = useState("");
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  const { handleSubmit } = useForm();

  const logoutFxn = async () => {
    await dispatch(logout());
  };

  const params = {
    name,
    description,
    type,
    target,
    color_code,
    maturity_date,
    maturity_trigger,
    // organizer,
    // team,
  };

  let data = new FormData();

  const payload = { params, data };

  const onCreateCampaign = async (data) => {
    setIsCreatingCampaign(true);
    console.log(data);
    try {
      const response = await dispatch(createCampaign(ROUTES.CAMPAIGNS_CREATE, data));
      toast.success(`${response.msg}`);
      setTimeout(window.open(LINKS.CONVERGEDASHBOARD), 4000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsCreatingCampaign(false);
    }
  };

  const sectors = ["Education", "Health", "Startup", "Energy"];
  const getUser = useCallback(async () => {
    try {
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

  return (
    <div>
      <AuthHOC
        back={() => setIsModalOpen(isModalOpen - 1)}
        isModalOpen={isModalOpen}
        logout={logoutFxn}>
        <ToastContainer />
        <LeftNav />
        <form
          onSubmit={(e) => {
            // setDocs(logo_pic);
            data.append("cover_pic", cover_pic, cover_pic.name);
            data.append("logo_pic", logo_pic, logo_pic.name);
            e.preventDefault();
            handleSubmit(onCreateCampaign(payload));
          }}>
          {isModalOpen === 0 ? (
            <div className="convergeForm">
              <p className="convergeFormHeader">
                Conver<span style={{ textDecoration: "none" }}>g</span>e
              </p>
              <p className="convergeFormSub">Create your campaign in 3 easy steps</p>
              <button onClick={() => setIsModalOpen(1)} className={`defButton convergeSwitch`}>
                <p className="buttonText">LET'S GO</p>
                <Arrow />
              </button>
            </div>
          ) : isModalOpen === 1 ? (
            <div className="convergeFormBox">
              <p className="convergeFormHeader" style={{ fontSize: "47px" }}>
                Conver<span style={{ textDecoration: "none" }}>g</span>e
              </p>
              <p className="convergeFormSub" style={{ fontSize: "24px" }}>
                Step 1
              </p>
              <div className="convergeFormBox" style={{ width: "100%", alignItems: "flex-start" }}>
                <p className="walletDesc conLabel">Campaign Name</p>
                <input
                  placeholder={`Type name here`}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => (e.target.placeholder = "")}
                  className={"chooseCard convergeFormField"}
                  type="text"
                />
              </div>

              <div className="convergeFormBox" style={{ width: "100%", alignItems: "flex-start" }}>
                <p className="walletDesc conLabel">Campaign Description</p>
                <input
                  placeholder={`Type description here`}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={(e) => (e.target.placeholder = "")}
                  className={"chooseCard convergeFormField"}
                  type="text"
                />
              </div>
              <div className="convergeFormBox" style={{ alignItems: "flex-start" }}>
                <p className="walletDesc conLabel">Campaign Sector</p>
                <div className="fundraisers" style={{ width: "563px" }}>
                  {sectors.map((item, index) => (
                    <p
                      key={index}
                      className={`convergeSector ${sector === item && `selectedSector`}`}
                      onClick={() => setSector(item)}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <input
                placeholder={`Other sectors`}
                id="other"
                onChange={(e) => setSector(e.target.value)}
                onFocus={(e) => (e.target.placeholder = "")}
                className={"chooseCard convergeFormField"}
                type="text"
              />
              <button
                onClick={() => {
                  setType(sector);
                  setIsModalOpen(2);
                }}
                className={`defButton convergeSwitch`}>
                <p className="buttonText">NEXT STEP</p>
                <Arrow />
              </button>
            </div>
          ) : isModalOpen === 2 ? (
            <div className="convergeFormBox">
              <p className="convergeFormHeader" style={{ fontSize: "47px" }}>
                Conver<span style={{ textDecoration: "none" }}>g</span>e
              </p>
              <p className="convergeFormSub" style={{ fontSize: "24px" }}>
                Step 2
              </p>
              <div className="convergeFormBox" style={{ alignItems: "flex-start" }}>
                <p className="walletDesc conLabel">Target Amount</p>
                <input
                  placeholder={`\u20A6 0.00`}
                  id="target"
                  onChange={(e) => setTarget(e.target.value)}
                  onFocus={(e) => (e.target.placeholder = "")}
                  className={"chooseCard convergeFormField"}
                  type="number"
                  datatype="currency"
                />
              </div>
              <div className="convergeFormBox" style={{ alignItems: "flex-start" }}>
                <p className="walletDesc conLabel">When will the fundraiser end?</p>
                <label className="customRadio">
                  <p className="walletDesc conLabel customRadioLabel">At target amount</p>
                  <input type="radio" name="radio" onClick={() => setTrigger("amount")} />
                  <span className="checkmark"></span>
                </label>
                <label className="customRadio">
                  <p className="walletDesc conLabel customRadioLabel">On a date</p>
                  <input type="radio" name="radio" onClick={() => setTrigger("date")} />
                  <span className="checkmark"></span>
                </label>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  onFocus={(e) => (e.target.placeholder = "")}
                  className={"chooseCard convergeFormField"}
                />
              </div>
              <div
                className="convergeFormBox"
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "30px",
                  width: "568px",
                }}>
                <p className="walletDesc conLabel">Choose a unique campaign color</p>
                <input
                  placeholder={`Hex Code`}
                  style={{
                    background: "#f8f8f8 0% 0% no-repeat padding-box",
                    border: "1px solid #b3b3b347",
                    borderRradius: " 10px",
                    height: "30px",
                    width: "50px",
                    marginLeft: "20px",
                  }}
                  onChange={(e) => setColor(e.target.value)}
                  onFocus={(e) => (e.target.placeholder = "")}
                  type="color"
                />
              </div>
              <button onClick={() => setIsModalOpen(3)} className={`defButton convergeSwitch`}>
                <p className="buttonText">NEXT STEP</p>
              </button>
            </div>
          ) : (
            <div className="convergeFormBox">
              <p className="convergeFormHeader" style={{ fontSize: "47px" }}>
                Conver<span style={{ textDecoration: "none" }}>g</span>e
              </p>
              <p className="convergeFormSub" style={{ fontSize: "24px" }}>
                Step 3
              </p>
              {/* <div className="convergeFormBox" style={{ alignItems: "flex-start" }}>
                <input hidden />
                <p className="walletDesc conLabel">Organizer Name (Optional)</p>
                <input
                  placeholder={`(e.g. company, group) `}
                  id="organizer"
                  // onChange={(e) => setOrganizer(e.target.value)}
                  onFocus={(e) => (e.target.placeholder = "")}
                  className={"chooseCard convergeFormField"}
                  type="text"
                />
              </div>
              <div className="convergeFormBox" style={{ alignItems: "flex-start" }}>
                <p className="walletDesc conLabel">Organizer Team Info (Optional)</p>
                <input
                  placeholder={`(e.g. company, group) `}
                  // onChange={(e) => setTeam(e.target.value)}
                  onFocus={(e) => (e.target.placeholder = "")}
                  className={"chooseCard convergeFormField"}
                  type="text"
                />
              </div> */}
              <div className="convergeFormBox" style={{ alignItems: "flex-start" }}>
                <p className="walletDesc conLabel">Upload Cover Photo (Optional)</p>
                <div className="uploadContainer">
                  <div className="upload-btn-wrapper">
                    <button className="defButton">UPLOAD PHOTO</button>
                    <input
                      type="file"
                      id="cover"
                      onChange={(e) => {
                        setCover(e.target.files[0]);
                      }}
                    />
                  </div>
                  <p className="walletDesc conLabel" style={{ width: "100%", textAlign: "right" }}>
                    {cover_pic.name}
                  </p>
                </div>
              </div>
              <div className="convergeFormBox" style={{ alignItems: "flex-start" }}>
                <p className="walletDesc conLabel">Upload Organizer Logo (Optional)</p>
                <div className="uploadContainer">
                  <div className="upload-btn-wrapper">
                    <button className="defButton">UPLOAD PHOTO</button>
                    <input
                      type="file"
                      id="logo"
                      onChange={(e) => {
                        setLogo(e.target.files[0]);
                      }}
                    />
                  </div>
                  <p className="walletDesc conLabel" style={{ width: "100%", textAlign: "right" }}>
                    {logo_pic.name}
                  </p>
                </div>
              </div>

              <button
                className={`defButton convergeSwitch`}
                type="submit"
                style={{ width: "50%", marginTop: "30px" }}>
                <p className="buttonText">
                  {isCreatingCampaign ? "Loading..." : "SEND FOR APPROVAL"}
                </p>
              </button>
            </div>
          )}
        </form>
      </AuthHOC>
    </div>
  );
}
