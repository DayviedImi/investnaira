import React, { useState } from "react";
import { Box } from "./box";
import "../assets/css/About.css";
import { ReactComponent as Save } from "../assets/svg/Save_Image.svg";
import { ReactComponent as Invest } from "../assets/svg/Invest_Image.svg";
import { ReactComponent as Compound } from "../assets/svg/Compound_Image.svg";

const About = () => {
  const [open, setOpen] = useState(0);

  const BoxItems = [
    {
      more:
        "Saving refers to delaying gratification. The ability not to eat all your earn today leads to a secured future.  Start to secure the future by delaying gratification NOW. ",
      quote:
        "The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order, trains to forethought, and so broadens the mind. –Thomas T. Munger",
      title: "Save",
      desc:
        "We all know the benefits of saving, but can admit to not always following through. Our in-app tools and reminders help you build that saving culture. Now kids too can join in on the fun!",
    },
    {
      more:
        "Investing refers to the ability to multiply money saved. Investing is an art and a science. InvestNaira provides a gradual but growing process to ensure that the buying value of money tommorow is higher than that of today. ",
      quote: "Don’t work for money; make it work for you.” - Robert Kiyosaki ",
      title: "Invest",
      desc:
        "Idle money devalues. At the same time, investments are hard, risky and most of the time, costly. We help you invest your savings in income-producing assets that bring positive returns. You also have complete control!",
    },
    {
      more:
        "Compound Interest is the 8th Wonder of the World. If you apply it, your earn exponentially, if you don't, you lose exponentially. Allow us compound (build wealth for the Long Term) with you!",
      quote:
        "Wealth from get-rich-quick schemes quickly disappears; wealth from hard work grows over time.",
      title: "Compound",
      desc:
        "Unsure about the future? Make your money work for you. By reinvesting returns from previous investments on our platform, you can sit back and watch your wealth grow exponentially.",
    },
  ];

  return open === 0 ? (
    <div className="wrapper">
      <div className="abCol1">
        <Box
          id="Save"
          setOpen={setOpen}
          open={open}
          className="box1"
          title={BoxItems[0].title}
          desc={open === 1 ? BoxItems[0].more : BoxItems[0].desc}
          quote={open === 1 ? BoxItems[0].quote : ""}
          img={<Save />}
        />
        <Box
          id="Invest"
          setOpen={setOpen}
          open={open}
          className="box3 box3a"
          title={BoxItems[1].title}
          desc={open === 3 ? BoxItems[1].more : BoxItems[1].desc}
          quote={open === 3 ? BoxItems[1].quote : ""}
          img={<Invest />}
        />
        <Box
          id="Compound"
          setOpen={setOpen}
          open={open}
          className="box2"
          title={BoxItems[2].title}
          desc={open === 2 ? BoxItems[2].more : BoxItems[2].desc}
          quote={open === 2 ? BoxItems[2].quote : ""}
          img={<Compound />}
        />
      </div>
      <div className="abCol2">
        <Box
          id="Invest"
          setOpen={setOpen}
          open={open}
          className="box3 box3b"
          title={BoxItems[1].title}
          desc={BoxItems[1].desc}
          img={<Invest />}
        />
      </div>
    </div>
  ) : open === 1 ? (
    <div className="aboutWrapper" style={{ padding: "0 6em" }}>
      <div className="fullAboutRow">
        <Box
          setOpen={setOpen}
          open={open}
          className="box1"
          style={{ width: "95%" }}
          title={BoxItems[0].title}
          desc={open === 1 ? BoxItems[0].more : BoxItems[0].desc}
          quote={open === 1 ? BoxItems[0].quote : ""}
          img={<Save />}
        />
      </div>
      <div
        className="aboutRow"
        style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Box
          setOpen={setOpen}
          open={open}
          className="box3"
          title={BoxItems[1].title}
          desc={open === 3 ? BoxItems[1].more : BoxItems[1].desc}
          quote={open === 3 ? BoxItems[1].quote : ""}
          img={<Invest />}
        />
        <Box
          setOpen={setOpen}
          open={open}
          className="box2"
          title={BoxItems[2].title}
          desc={open === 2 ? BoxItems[2].more : BoxItems[2].desc}
          quote={open === 2 ? BoxItems[2].quote : ""}
          img={<Compound />}
        />
      </div>
    </div>
  ) : open === 2 ? (
    <div className="aboutWrapper" style={{ padding: "0 6em" }}>
      <div
        className="aboutRow"
        style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Box
          open={open}
          setOpen={setOpen}
          className="box1"
          title={BoxItems[0].title}
          desc={open === 1 ? BoxItems[0].more : BoxItems[0].desc}
          quote={open === 1 ? BoxItems[0].quote : ""}
          img={<Save />}
        />
        <Box
          open={open}
          setOpen={setOpen}
          className="box3"
          title={BoxItems[1].title}
          desc={open === 3 ? BoxItems[1].more : BoxItems[1].desc}
          quote={open === 3 ? BoxItems[1].quote : ""}
          img={<Invest />}
        />
      </div>
      <div className="fullAboutRow">
        <Box
          open={open}
          setOpen={setOpen}
          className="box2"
          style={{ width: "95%" }}
          title={BoxItems[2].title}
          desc={open === 2 ? BoxItems[2].more : BoxItems[2].desc}
          quote={open === 2 ? BoxItems[2].quote : ""}
          img={<Compound />}
        />
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <div className="abCol1">
        <Box
          open={open}
          setOpen={setOpen}
          className="box1"
          title={BoxItems[0].title}
          desc={open === 1 ? BoxItems[0].more : BoxItems[0].desc}
          quote={open === 1 ? BoxItems[0].quote : ""}
          img={<Save />}
        />
        <Box
          open={open}
          setOpen={setOpen}
          className="box2"
          title={BoxItems[2].title}
          desc={open === 2 ? BoxItems[2].more : BoxItems[2].desc}
          quote={open === 2 ? BoxItems[2].quote : ""}
          img={<Compound />}
        />
      </div>
      <div className="abCol2">
        <Box
          open={open}
          setOpen={setOpen}
          className="box3"
          style={{ height: "69%", flexDirection: "column", justifyContent: "flex-start" }}
          title={BoxItems[1].title}
          desc={open === 3 ? BoxItems[1].more : BoxItems[1].desc}
          quote={open === 3 ? BoxItems[1].quote : ""}
          img={<Invest width={300} />}
        />
      </div>
    </div>
  );
};

export default About;
