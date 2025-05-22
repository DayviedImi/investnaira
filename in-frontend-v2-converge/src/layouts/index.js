import React from 'react';
import Header from 'components/navigation/Header';
import Footer from 'components/navigation/Footer';

export default ({ children }) => (
  <div className="main-container" id="layoutContent">
    <Header />
    <div id="layoutMain">{children}</div>
    <Footer />
  </div>
);
