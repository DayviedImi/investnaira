import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { logout } from "../store/actions/auth";
import * as campaignActions from "../store/actions/campaigns";
import * as LINKS from "../routes/routes";
import "../assets/css/conLanding.css";

const Featured = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const [campaigns, setCampaigns] = useState([]);
  const [showAll, setShowAll] = useState(false);
  // const [sector, setSector] = useState("");

  const sectors = ["Education", "Health", "Startup", "Energy", "Other"];

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
    getCampaigns();
  }, [getCampaigns]);

  const camps = !showAll ? campaigns.slice(0, 4) : campaigns;

  return (
    <div>
      <div className="kids">
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
                exact
                to={{
                  pathname:
                    location.pathname === "/converge"
                      ? `${LINKS.CONVERGE}/${item.short_id}`
                      : LINKS.OVERVIEW,
                  state: { item: item },
                }}>
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
                      {/* <div className="textCon">
                        <p className="fundHeaderText">{item.trxCount}</p>
                        <p className="fundDesc fundDescText">Funders</p>
                      </div> */}
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
      {/* <div className="con">
        <div className="conSearch">
          <input
            placeholder={`Search for the right campaign`}
            id="other"
            onChange={(e) => setSector(e.target.value)}
            onFocus={(e) => (e.target.placeholder = "")}
            className={"chooseCard convergeFormField"}
            type="text"
          />
          <div className="fundraisers fundSec" style={{ width: "563px" }}>
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
      </div> */}
      <div className="kids">
        <div className="convergeContainer">
          <h3>Campaigns near you</h3>
        </div>
        <div className="fundraisers">
          {sectors.map((item, key) => (
            <div className="fundraiserContainer comingSoon">
              <div className="comingSoonContainer">
                <p className="comingSoonText">COMING SOON</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
