import React from "react";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";

import "../assets/css/Footer2.css";
const Footer2 = () => {
  return (
    <>
      <div className="footer2">
        <h3 className="footertext">© InvestNaira 2022</h3>
        <div className="social">
          <a target="blank" href="https://api.whatsapp.com/send?phone=2349051667728">
            <WhatsAppIcon className="whatsapp" />
          </a>
          <a target="blank" href="https://www.instagram.com/investnaira">
            <InstagramIcon className="whatsapp" />
          </a>
          <a target="blank" href="https://www.twitter.com/investnaira">
            <TwitterIcon className="whatsapp" />
          </a>
          <a target="blank" href="https://www.messenger.com/t/investnaira">
            <FacebookIcon className="whatsapp" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer2;
