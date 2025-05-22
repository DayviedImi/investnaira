import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ToastContainer, toast } from "react-toastify";

import * as userActions from "../store/actions/user";
import * as campaignActions from "../store/actions/campaigns";
import * as ROUTES from "../routes/endpoints";

import { ReactComponent as Trash } from "../assets/svg/trash.svg";
import { ReactComponent as Close } from "../assets/svg/close.svg";

import { logout } from "../store/actions/auth";
import AuthHOC from "./authHOC";
import "../assets/css/dashboard.css";
import "../assets/css/converge.css";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";

import LeftNav from "../components/LeftNav";
import { Button } from "../components/Button";

export default function Dashboard() {
  const dispatch = useDispatch();

  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [id, setId] = useState();
  const [campaigns, setCampaigns] = useState([]);
  const [funded, setFunded] = useState([]);
  const [data, setData] = useState({});

  const logoutFxn = async () => {
    await dispatch(logout());
  };

  const getData = useCallback(async () => {
    try {
      const response = await dispatch(userActions.getDashboard(ROUTES.DASHBOARD_GET));
      await setData(response);
    } catch (err) {
      if (err.message.includes("Authentication Error")) {
        await dispatch(logout());
      }
    }
  }, [dispatch, setData]);

  const getMyCampaigns = useCallback(async () => {
    try {
      const response = await dispatch(campaignActions.getMyCampaigns());
      await setCampaigns(response);
    } catch (err) {
      if (err.message.includes("Authentication Error")) {
        await dispatch(logout());
      }
    }
  }, [dispatch]);

  const getFunded = useCallback(async () => {
    try {
      const response = await dispatch(campaignActions.getFundedCampaigns());
      await setFunded(response);
    } catch (err) {
      if (err.message.includes("Authentication Error")) {
        await dispatch(logout());
      }
    }
  }, [dispatch]);

  const onCampaignDelete = async (id) => {
    try {
      const response = await dispatch(campaignActions.deleteCampaign(id));
      response.msg === "Campaign Deleted"
        ? toast.success(`${response.msg}`)
        : toast.error(`${response.msg}`);
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
      console.log("error message", err.message);
    } finally {
    }
  };

  useEffect(() => {
    getData();
    getMyCampaigns();
    getFunded();
  }, [getData, getMyCampaigns, getFunded]);

  const active = campaigns.filter((campaign) => campaign.status === "active");
  const expired = campaigns.filter((campaign) => campaign.status === "completed");
  const pending = campaigns.filter((campaign) => campaign.status === "pending");
  // const funded = campaigns.filter((campaign) => campaign.balance > 0);

  const campaignSum = [
    {
      name: "All Campaigns",
      background: "#4CAF50",
      number: campaigns.length,
      color: "white",
    },
    {
      name: "Active Campaigns",
      background: "#E4F3E5",
      number: active.length,
      color: "#4CAF50",
    },
    {
      name: "Completed Campaigns",
      background: "#FCDDDD",
      number: expired.length,
      color: "#E81C1C",
    },
    {
      name: "Pending Campaigns",
      background: "#F9F3E1",
      number: pending.length,
      color: "#D4AF37",
    },
  ];
  console.log(data);
  return (
    <div>
      {isCreating ? (
        <div className="creatingContainer">
          <div
            className="creatingBackground"
            onClick={() => {
              setIsCreating(false);
              setIsDeleting(false);
            }}
          />
          <div style={{ height: "auto" }} className="creatingBox">
            {isDeleting && (
              <div className="deleteConfirmCont">
                <div className="closeModal">
                  <Close
                    onClick={() => {
                      setIsCreating(false);
                      setIsDeleting(false);
                    }}
                  />
                </div>
                <h1 className="closeModalHeader">Are you sure about this?</h1>
                <p className="closeModalDescription">
                  You are about to delete a campaign. <br />
                  You cannot undo this action.
                </p>
                <div className="delButCont">
                  <Button
                    style={{ backgroundColor: "#FE0000", marginRight: 0, border: 0 }}
                    onClick={() => onCampaignDelete(id)}
                    title="DELETE CAMPAIGN"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
      <AuthHOC logout={logoutFxn}>
        <LeftNav />
        <ToastContainer />
        <div className="homepage">
          <div className="conDashHeaderContainer">
            <p className="conDashHeader">Your Dashboard</p>
            <div className="campaignSumContainer">
              {campaignSum.map((item, index) => (
                <div style={{ backgroundColor: item.background }} className="campaignSumBox">
                  <p style={{ color: item.color }} className="campaignSumName">
                    {item.name}
                  </p>
                  <p style={{ color: item.color }} className="campaignSumNumber">
                    {item.number}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="kids" data-tut="second-step">
            <Tabs selectedTabClassName="activeCamp">
              <TabList
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #E4E8E5",
                  marginBottom: "36px",
                }}>
                <Tab style={{ padding: "29px 33px" }}>
                  <p className="tabHeader">Created Campaigns</p>
                </Tab>
                <Tab style={{ padding: "29px 33px" }}>
                  <p className="tabHeader">Funded Campaigns</p>
                </Tab>
              </TabList>
              <TabPanel>
                {campaigns.map((item, index) => (
                  <div className="campaignItem">
                    <div className="convergeHeader" style={{ width: "40%" }}>
                      <div style={{ textAlign: "left", marginLeft: "20px" }}>
                        <p className="conDashHeader" style={{ fontSize: "24px", margin: 0 }}>
                          {item.name}
                        </p>
                        {/* <p className="tabHeader">
                          Organizer - {`${item.user.firstname} ${item.user.lastname}`}
                        </p> */}
                      </div>
                    </div>
                    <p style={{}} className={`convergeSector conSector`}>
                      {item.type}
                    </p>
                    <p
                      className="conDashHeader"
                      style={{ width: "150px", fontSize: "18px", margin: 0 }}>
                      &#8358;{`${item.balance} raised`}
                    </p>
                    <div
                      className="fundDetailsContainer"
                      style={{ marginBottom: "20px", width: "150px" }}>
                      <div style={{ borderRight: "1px solid #cccccc", paddingRight: "20px" }}>
                        <p className="fundHeaderText">{item.trxCount}</p>
                        <p className="fundDesc fundDescText">Funders</p>
                      </div>
                      <div>
                        <p className="fundHeaderText">&#8358; 100</p>
                        <p className="fundDesc fundDescText">Min. Amt.</p>
                      </div>
                    </div>
                    <p
                      className="conDashHeader conType"
                      style={{
                        backgroundColor:
                          item.status === "pending"
                            ? "#F9F3E1"
                            : item.status === "completed"
                            ? "#FCDDDD"
                            : item.status === "active" && "#E4F3E5",
                        color:
                          item.status === "pending"
                            ? "#D4AF37"
                            : item.status === "completed"
                            ? "#E81C1C"
                            : item.status === "active" && "#4CAF50",
                      }}>
                      {item.status.replace(/^\w/, (c) => c.toUpperCase())}
                    </p>
                    <div
                      className="trashContainer"
                      onClick={() => {
                        setIsCreating(true);
                        setIsDeleting(true);
                        setId(item.id);
                      }}>
                      <Trash />
                    </div>
                  </div>
                ))}
              </TabPanel>
              <TabPanel>
                {funded.map((item, index) => (
                  <div className="campaignItem">
                    <div className="convergeHeader" style={{ width: "40%" }}>
                      <div style={{ textAlign: "left", marginLeft: "20px" }}>
                        <p className="conDashHeader" style={{ fontSize: "24px", margin: 0 }}>
                          {item.name}
                        </p>
                        <p className="tabHeader">
                          {/* Organizer - {`${item.user.firstname} ${item.user.lastname}`} */}
                        </p>
                      </div>
                    </div>
                    <p style={{}} className={`convergeSector conSector`}>
                      {item.type}
                    </p>
                    <p
                      className="conDashHeader"
                      style={{ width: "150px", fontSize: "18px", margin: 0 }}>
                      &#8358;{`${item.balance} raised`}
                    </p>
                    <div
                      className="fundDetailsContainer"
                      style={{ marginBottom: "20px", width: "150px" }}>
                      {/* <div style={{ borderRight: "1px solid #cccccc", paddingRight: "20px" }}>
                        <p className="fundHeaderText">12</p>
                        <p className="fundDesc fundDescText">Funders</p>
                      </div> */}
                      <div>
                        <p className="fundHeaderText">&#8358; 100</p>
                        <p className="fundDesc fundDescText">Min. Amt.</p>
                      </div>
                    </div>
                    <p className="conDashHeader" style={{ fontSize: "18px", margin: 0 }}>
                      {item.status.replace(/^\w/, (c) => c.toUpperCase())}
                    </p>
                    {/* <div className="trashContainer" onClick={() => onCampaignDelete(item.id)}>
                      <Trash />
                    </div> */}
                  </div>
                ))}
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </AuthHOC>
    </div>
  );
}
