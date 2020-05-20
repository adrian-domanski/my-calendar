import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="l-page-wrapper">
      <Navbar />
      <div className="l-content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
