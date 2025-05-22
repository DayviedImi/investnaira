import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../routes/routes";
import { ReactComponent as Home } from "../assets/svg/home-alt.svg";
import { ReactComponent as Wallet } from "../assets/svg/wallet.svg";
import { ReactComponent as Converge } from "../assets/svg/conIcon.svg";
import { ReactComponent as Profile } from "../assets/svg/user-circle.svg";
import { ReactComponent as Settings } from "../assets/svg/cog.svg";
import { useSelector } from "react-redux";
import { sumBalances } from "../utils/helperFxns";

const LeftUl = styled.ul`
  list-style: none;
  flex-flow: row nowrap;
  top: 3em;
  float: left;
  justify-content: center;
  align-items: left;
  padding: 0;
  border-right: 1px solid #ccc;
  display: flex;
  @media (max-width: 1080px) {
    display: ${({ open }) => (open ? "flex" : "none")};
  }
  li {
    padding: 18px 100px;
  }

  p {
    font-size: 18px;
    font-family: "AvenirNextCyr-Medium";
  }
  .txt {
    margin-top: 20px;
  }
  .leftNavIcon {
    opacity: 1;
    margin-right: 2em;
    color: #4caf50 !important;
  }
  .link {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0.75em 0;
    position: relative;
    height: 60px;
    color: #6e7272 !important;
    width: 180px;
    padding-left: 20px;
  }
  .is-active {
    background: #f8f8f8;
    border-radius: 14px;
    border-left: 7px solid #4caf50;
    color: #4caf50 !important;
  }
  p {
    font-size: 18px;
    font-family: "AvenirNextCyr-Medium";
  }
  .netWorth {
    font-family: "AvenirNextCyr-Regular";
    font-size: 14px;
    color: #999999;
    margin: 0;
  }
  .netWorthValue {
    font-family: "AvenirNextCyr-Bold";
    font-size: 28px;
    color: #4caf50;
    margin-bottom: 30px;
  }
  @media (min-width: 100px) {
    z-index: 4;
    flex-flow: column nowrap;
    background-color: #fff;
    position: fixed;
    height: 100vh;
    padding-left: 10px;
    width: 241px;
    transition: transform 0.3s ease-in-out;
    li {
      color: #4caf50;
    }
  }
`;

const LeftNav = ({ open }) => {
  const plans = useSelector((state) => state.plans);
  const wallet = useSelector((state) => state.wallet);
  return (
    <LeftUl open={open}>
      <div>
        <p className="netWorth">Networth</p>
        <h3 className="netWorthValue">
          &#8358;
          {sumBalances(plans, wallet.balance)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h3>
      </div>
      <NavLink exact activeClassName="is-active" className="link leftNavLink" to={ROUTES.DASHBOARD}>
        <Home
          style={{ width: "27.5px", height: "21.4px", marginRight: "1.7em" }}
          className="leftNavIcon"
        />
        <p>Home</p>
      </NavLink>
      <NavLink exact activeClassName="is-active" className="link leftNavLink" to={ROUTES.WALLET}>
        <Wallet className="leftNavIcon" />
        <p>Wallet</p>
      </NavLink>
      <NavLink
        activeClassName="is-active"
        className="link leftNavLink"
        to={ROUTES.CONVERGEDASHBOARD}>
        <Converge
          style={{ width: "27.5px", height: "21.4px", marginRight: "1.7em" }}
          className="leftNavIcon"
        />
        <p>Converge</p>
      </NavLink>
      <NavLink exact activeClassName="is-active" className="link leftNavLink" to={ROUTES.PROFILE}>
        <Profile
          style={{ width: "23px", height: "23px", marginRight: "2.3em" }}
          className="leftNavIcon"
        />
        <p>Profile</p>
      </NavLink>
      <NavLink exact activeClassName="is-active" className="link leftNavLink" to={ROUTES.SETTINGS}>
        <Settings
          style={{ width: "22px", height: "22px", marginRight: "2.4em" }}
          className="leftNavIcon"
        />
        <p>Settings</p>
      </NavLink>
    </LeftUl>
  );
};

export default LeftNav;
