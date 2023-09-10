import React, { useContext } from "react";
import Header from "./Pages/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import { UserContext } from "./context/UserContext";

function SharedLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default SharedLayout;
