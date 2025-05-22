import React from "react";

export const Button = (props) => {
  return (
    <button style={props.style} className={`defButton ${props.className}`} onClick={props.onClick}>
      {props.title ? props.title : props.children}
    </button>
  );
};
