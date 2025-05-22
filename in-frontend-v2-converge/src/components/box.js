import React from "react";
import { Button } from "./Button";
import "../assets/css/box.css";

export const Box = (props) => {
  return (
    <div
      onClick={() => console.log(window.innerWidth)}
      id={props.id}
      style={props.style}
      className={`square ${props.className}`}>
      <div>
        <p className={`txt3 ${props.className === "box1" ? "" : "lighttxt"}`}>{props.title}</p>
        <p
          style={{ width: props.open === 0 ? "295px" : "100%" }}
          className={`txt4 ${props.className === "box1" ? "" : "lighttxt"}`}>
          {props.desc}
        </p>
        {props.open !== 0 && (
          <p
            style={{
              width: "100%",
              fontSize: "12px",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            className={`txt4 ${props.className === "box1" ? "" : "lighttxt"}`}>
            {props.quote}
          </p>
        )}
        <Button
          style={{
            backgroundColor: props.className === "box1" ? "#4caf50" : "white",
            color: props.className === "box1" ? "white" : "#4caf50",
            border: "none",
            marginLeft: 0,
          }}
          onClick={() =>
            props.open !== 0
              ? props.setOpen(0)
              : props.className === "box1"
              ? props.setOpen(1)
              : props.className === "box2"
              ? props.setOpen(2)
              : props.setOpen(3)
          }
          className={`txt showMore learnButton`}
          title={
            (props.className === "box1" && props.open === 1) ||
            (props.className === "box2" && props.open === 2) ||
            (props.className === "box3" && props.open === 3)
              ? "SHOW LESS"
              : "LEARN MORE"
          }
        />
      </div>
      {props.img}
    </div>
  );
};
