import React, { Component } from "react";
import Logo from "../../assets/images/128.jpg";
import { Button } from "../Button";
import MenuItems from "../Navbar/MenuItems";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "../../assets/css/button.css";

import { ReactComponent as Bell } from "../../assets/svg/bell.svg";
import { ReactComponent as SignOut } from "../../assets/svg/sign-out-alt.svg";

class Navbar extends Component {
  render() {
    return (
      <nav className="NavbarItems">
        <Link to="/" className="brand">
          <img
            style={{ marginLeft: window.location.pathname === "/dashboard" && "118px" }}
            className="navbar-logo"
            src={Logo}
            alt="logo"
          />
          <h1 className="logo-text">InvestNaira</h1>
        </Link>
        {window.location.pathname === "/dashboard" ? (
          <div className="nav_right">
            <Bell />
            <div className="sub_nav_right">
              <SignOut />
              <h3>Logout</h3>
            </div>
          </div>
        ) : (
          <div>
            <div className="nav-menu2">
              <ul className="nav-menu">
                {MenuItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <a className={item.cName} href={item.url}>
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button className="txt loginButton" title="Log In" />
              </Link>
              <Link to="/signup">
                <Button className="txt getButton" title="Get Started" />
              </Link>
            </div>
          </div>
        )}
        {/* <Burger /> */}
      </nav>
    );
  }
}
export default Navbar;
