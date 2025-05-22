import React from "react";

import Nav from "../components/Navbar";
import Navbar from "../components/Navbar/Navbar";

export default function NotFound() {
  return (
    <div className="App">
      <Nav />
      <Navbar />
      <div className="container">
        <h1 className="formHeader">{`Oops..., We can't seem to find this page`}</h1>
      </div>
    </div>
  );
}
