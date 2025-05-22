import React from "react";

import Nav from "../components/Navbar";
import Navbar from "../components/Navbar/Navbar";
import ConLanding from "../components/ConLanding";
import Footer1 from "../components/Footer1";
import Footer2 from "../components/Footer2";
import Featured from "../components/Featured";

function App() {
  return (
    <div className="App">
      <Nav />
      <Navbar />
      <ConLanding />
      <Featured />
      <Footer1 />
      <Footer2 />
    </div>
  );
}

export default App;
