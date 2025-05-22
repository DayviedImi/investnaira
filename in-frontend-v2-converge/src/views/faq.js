import React from "react";
import { Link, Element } from "react-scroll";

import AuthHOC from "./authHOC";

export default function Faq(props) {
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
    <AuthHOC header="Frequently Asked Questions">
      <div className="faqContainer">
        <div style={{ height: "83vh" }} className="faqHeaders">
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
        <div id="answers" style={{ height: "83vh" }} className="faqDetails">
          {faqAnswers.map((item, index) => (
            <Element name={faqHeaders[index]}>
              <p style={{ marginBottom: 0, fontSize: "18px" }} className="faqHeader" key={index}>
                {faqHeaders[index]}
              </p>
              <p style={{ marginTop: 0 }} className="faq" key={index}>
                {item}
              </p>
            </Element>
          ))}
        </div>
      </div>
    </AuthHOC>
  );
}
