import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Tour from "reactour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import * as userActions from "../store/actions/user";
import * as campaignActions from "../store/actions/campaigns";
import * as ROUTES from "../routes/endpoints";
import * as LINKS from "../routes/routes";
import { getReferrals } from "../store/actions/referrals";
import { getBankDetails } from "../store/actions/bank";
import { Button } from "../components/Button";

import { logout } from "../store/actions/auth";
import AuthHOC from "./authHOC";
import "../assets/css/dashboard.css";
import "../assets/css/converge.css";
import "react-circular-progressbar/dist/styles.css";

import LeftNav from "../components/LeftNav";

export default function Dashboard() {
  const dispatch = useDispatch();

  const [isTourOpen, setIsTourOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [showAll, setShowAll] = useState(false);

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

  const logoutFxn = async () => {
    await dispatch(logout());
  };
  const closeTour = () => {
    setIsTourOpen(false);
  };

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

  const getCampaigns = useCallback(async () => {
    try {
      const response = await dispatch(campaignActions.getAllCampaigns());
      await setCampaigns(response);
    } catch (err) {
      if (err.message.includes("Authentication Error")) {
        await dispatch(logout());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
    getCampaigns();
  }, [getUser, getCampaigns]);

  const camps = !showAll ? campaigns.slice(0, 4) : campaigns;

  return (
    <div>
      <AuthHOC logout={logoutFxn}>
        <LeftNav />
        <div className="homepage">
          <div className="plans">
            <div className="convergeBackground"></div>
            <div className="conHeader">
              <h2
                style={{
                  fontSize: 40,
                }}>
                Converge
              </h2>
              <h1
                style={{
                  fontSize: 50,
                }}>
                Raise funds for the causes you care about
              </h1>
              <div className="conLinks">
                <Link to={LINKS.CONHOME}>
                  <Button
                    className="txt button convergeButton convergeClear"
                    type="Submit"
                    title="GO TO DASHBOARD"
                  />
                </Link>
                <Link to={LINKS.CREATE}>
                  <Button
                    className="txt button convergeButton"
                    type="Submit"
                    title="CREATE YOUR PERSONAL FUNDRAISER"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="kids" data-tut="second-step">
            <div className="convergeContainer">
              <h3>Featured Fundraisers</h3>
              <p style={{ cursor: "pointer" }} onClick={() => setShowAll(!showAll)}>
                View {!showAll ? `All` : `Less`}
              </p>
            </div>
            <div className="fundraisers">
              {camps.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className="fundraiserContainer"
                    exact={true}
                    to={{ pathname: LINKS.OVERVIEW, state: { item: item } }}>
                    <div>
                      <img src={item.cover_pic} alt="back" height={183} width="100%" />
                      <div className="fundContainer">
                        <p className="fundHeader">{item.name}</p>
                        <p className="fundDesc">{item.description}</p>
                        <div className="horizontalBar" />
                        <div className="fundDetailsContainer">
                          <div className="textCon">
                            <p className="fundHeaderText">&#8358; {item.balance}</p>
                            <p className="fundDesc fundDescText">Raised</p>
                          </div>
                          <div className="textCon">
                            <p className="fundHeaderText">{item.trxCount}</p>
                            <p className="fundDesc fundDescText">Funders</p>
                          </div>
                          <div>
                            <p className="fundHeaderText">&#8358; 100</p>
                            <p className="fundDesc fundDescText">Min. Amt.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              {campaigns.length < 4 ? (
                <div className="fundraiserContainer comingSoon">
                  <div className="comingSoonContainer">
                    <p className="comingSoonText">COMING SOON</p>
                  </div>
                </div>
              ) : null}
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
