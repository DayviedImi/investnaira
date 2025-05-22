import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/128.jpg";
import * as ROUTES from "../../routes/routes";
import MenuItems from "../Navbar/MenuItems";
import { Link } from "react-router-dom";
import { ReactComponent as Wallet } from "../../assets/svg/walletColoured.svg";
import { format, parseISO } from "date-fns";
import { Button } from "../Button";
import { ReactComponent as Profile } from "../../assets/svg/user-circle.svg";
import { ReactComponent as Settings } from "../../assets/svg/colouredCog.svg";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Converge } from "../../assets/svg/conIcon (coloured).svg";
import { ReactComponent as Back } from "../../assets/svg/convergeBackButton.svg";

import "./Navbar.css";
import "../../assets/css/button.css";

import { ReactComponent as Bell } from "../../assets/svg/bell.svg";
import { ReactComponent as SignOut } from "../../assets/svg/sign-out-alt.svg";

function Navbar(props) {
  const [isOpened, setIsOpened] = useState(false);
  const [seeAll, setSeeAll] = useState(false);
  const notifications = useSelector((state) => state.notifications);

  return (
    <nav className="NavbarItems">
      <NavLink to="/" className="logoGroup">
        <img className="navbar-logo" src={Logo} alt="logo" />
        {window.location.pathname === "/dashboard" ||
        window.location.pathname === "/dashboard/wallet" ||
        window.location.pathname === "/dashboard/profile" ||
        window.location.pathname === "/dashboard/converge" ||
        window.location.pathname === "/dashboard/converge/overview" ||
        window.location.pathname === "/dashboard/converge/create" ||
        window.location.pathname === "/dashboard/converge/dashboard" ||
        window.location.pathname === "/dashboard/settings" ? (
          ""
        ) : (
          <h1 className="logo-text">InvestNaira</h1>
        )}
      </NavLink>
      {window.location.pathname === "/dashboard" ||
      window.location.pathname === "/dashboard/wallet" ||
      window.location.pathname === "/dashboard/profile" ||
      window.location.pathname === "/dashboard/converge" ||
      window.location.pathname === "/dashboard/converge/overview" ||
      window.location.pathname === "/dashboard/converge/create" ||
      window.location.pathname === "/dashboard/converge/dashboard" ||
      window.location.pathname === "/dashboard/settings" ? (
        ""
      ) : (
        <div className="nav-menu2">
          <ul className="nav-menu">
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a
                    className={`${item.cName} ${item.title === "Converge" && "blink_me"}`}
                    href={item.url}>
                    {`${item.title}`}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div
        className={
          window.location.pathname === "/dashboard" ||
          window.location.pathname === "/dashboard/wallet" ||
          window.location.pathname === "/dashboard/profile" ||
          window.location.pathname === "/dashboard/converge" ||
          window.location.pathname === "/dashboard/converge/overview" ||
          window.location.pathname === "/dashboard/converge/create" ||
          window.location.pathname === "/dashboard/converge/dashboard" ||
          window.location.pathname === "/dashboard/settings"
            ? "rightDashNav"
            : ""
        }
        style={{
          width:
            window.location.pathname === "/dashboard" ||
            window.location.pathname === "/dashboard/wallet" ||
            window.location.pathname === "/dashboard/profile" ||
            window.location.pathname === "/dashboard/converge" ||
            window.location.pathname === "/dashboard/converge/overview" ||
            window.location.pathname === "/dashboard/converge/create" ||
            window.location.pathname === "/dashboard/converge/dashboard" ||
            window.location.pathname === "/dashboard/settings"
              ? "calc(100% - 262px)"
              : "",
          justifyContent: window.location.pathname === "/dashboard" ? "flex-end" : "space-between",
        }}>
        {window.location.pathname === "/dashboard/wallet" && (
          <div className="walletHeader">
            <div className="wallet">
              <Wallet className="leftNavIcon" alt="wallet" />
              <p className="walletText">Wallet</p>
            </div>
            <p className="walletDesc">Control your wallet transactions</p>
          </div>
        )}
        {window.location.pathname === "/dashboard/profile" && (
          <div className="walletHeader">
            <div className="wallet">
              <Profile className="leftNavIcon" alt="profile" />
              <p className="walletText">Profile</p>
            </div>
          </div>
        )}
        {window.location.pathname === "/dashboard/converge" && (
          <div className="walletHeader">
            <div className="wallet">
              <Converge className="leftNavIcon" alt="converge" />
              <p className="walletText">Converge</p>
            </div>
          </div>
        )}
        {window.location.pathname === "/dashboard/converge/dashboard" ||
        window.location.pathname === "/dashboard/converge/overview" ? (
          <div className="walletHeader">
            <div className="wallet">
              {props.isModalOpen === 0 ? null : (
                <NavLink exact to={ROUTES.CONVERGEDASHBOARD} style={{ marginRight: "15px" }}>
                  <Back className="leftNavIcon" alt="Back" />
                </NavLink>
              )}
              <Converge className="leftNavIcon" alt="converge" />
              <p className="walletText">Converge</p>
            </div>
          </div>
        ) : (
          ""
        )}
        {window.location.pathname === "/dashboard/converge/create" && (
          <div className="walletHeader">
            <div className="wallet">
              {props.isModalOpen === 0 ? null : (
                <div onClick={props.back} style={{ marginRight: "15px" }}>
                  <Back className="leftNavIcon" alt="Back" />
                </div>
              )}
              <Converge className="leftNavIcon" alt="converge" />
              <p className="walletText">Converge</p>
            </div>
          </div>
        )}

        {window.location.pathname === "/dashboard/settings" && (
          <div className="walletHeader">
            <div className="wallet">
              <Settings className="leftNavIcon" alt="settings" />
              <p className="walletText">Settings</p>
            </div>
          </div>
        )}
        {window.location.pathname === "/dashboard" ||
        window.location.pathname === "/dashboard/wallet" ||
        window.location.pathname === "/dashboard/profile" ||
        window.location.pathname === "/dashboard/converge" ||
        window.location.pathname === "/dashboard/converge/overview" ||
        window.location.pathname === "/dashboard/converge/create" ||
        window.location.pathname === "/dashboard/converge/dashboard" ||
        window.location.pathname === "/dashboard/settings" ? (
          ""
        ) : (
          <div className="buttonContainer">
            <Link to="/login">
              <Button className="txt loginButton" title="Log In" />
            </Link>
            <Link to="/signup">
              <Button className="txt getButton" title="Get Started" />
            </Link>
          </div>
        )}
        {window.location.pathname === "/dashboard" ||
        window.location.pathname === "/dashboard/wallet" ||
        window.location.pathname === "/dashboard/profile" ||
        window.location.pathname === "/dashboard/converge" ||
        window.location.pathname === "/dashboard/converge/overview" ||
        window.location.pathname === "/dashboard/converge/create" ||
        window.location.pathname === "/dashboard/converge/dashboard" ||
        window.location.pathname === "/dashboard/settings" ? (
          <div className="nav_right">
            <div
              onClick={() => setIsOpened(!isOpened)}
              style={{ padding: "5px", cursor: "pointer", paddingRight: 0 }}>
              <Bell className="bell" />
            </div>
            {isOpened ? (
              <div className="dropdown">
                <div className="notificationsDropHeader">
                  <p className="notificationHeader">Notifications</p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSeeAll(true);
                      setIsOpened(false);
                    }}
                    className="seeAllButton">
                    See All
                  </p>
                </div>
                <ul className="dropContainer">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 4).map((item, index) => (
                      <li key={index} className="dropItem">
                        <p>{`${item.subject} ${item.body}`}</p>{" "}
                        <p style={{ fontSize: "10px" }}>
                          {format(parseISO(item.created_at), "do MMM yyyy")}
                        </p>
                      </li>
                    ))
                  ) : (
                    <h5>No Notifications yet</h5>
                  )}
                </ul>
                <div className="notificationsFooter">
                  <p className="notificationHeader">Mark all as read</p>
                </div>
              </div>
            ) : null}
            {seeAll ? (
              <div className="allNotifications">
                <div className="notificationsDropHeader">
                  <p className="notificationHeader">Notifications</p>
                  <Close style={{ cursor: "pointer" }} onClick={() => setSeeAll(false)} />
                </div>
                <div className="dropContainer">
                  <ul>
                    {notifications.length > 0 ? (
                      notifications.map((item, index) => (
                        <li key={index} className="dropItem">
                          <p>{`${item.subject} ${item.body}`}</p>{" "}
                          <p style={{ fontSize: "10px" }}>
                            {format(parseISO(item.created_at), "do MMM yyyy")}
                          </p>
                        </li>
                      ))
                    ) : (
                      <h5>No Notifications yet</h5>
                    )}
                  </ul>
                </div>
              </div>
            ) : null}
            <div onClick={() => props.logout()} className="sub_nav_right">
              <SignOut className="out" />
              <p className="logout_text">Logout</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
export default Navbar;
