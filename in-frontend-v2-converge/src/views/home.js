import React from "react";

import Nav from "../components/Navbar";
import Navbar from "../components/Navbar/Navbar";
import Wealth from "../components/Wealth";
import About from "../components/About";
import Calculator from "../components/calculator";
import Started from "../components/Started";
import Secure from "../components/Secure";
import Mobile from "../components/Mobile";
import Testimonials from "../components/Testimonials";
import Footer1 from "../components/Footer1";
import Footer2 from "../components/Footer2";

function App() {
  return (
    <div className="App">
      <Nav />
      <Navbar />
      <Wealth />
      <About />
      <Started />
      <Secure />
      <Calculator />
      <Mobile />
      <Testimonials />
      <Footer1 />
      <Footer2 />
    </div>
  );
}

export default App;
