import React, { useState } from "react";
import { Box } from "../box";
import "./About.css";
import BoxItems from "./BoxItems";
import { ReactComponent as Save } from "../../assets/svg/Save_Image.svg";
import { ReactComponent as Invest } from "../../assets/svg/Invest_Image.svg";
import { ReactComponent as Compound } from "../../assets/svg/Compound_Image.svg";

const About = () => {
  const [open, setOpen] = useState(0);
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
