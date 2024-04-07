import React from "react";
import TopBar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";
import Footer from "../components/common/footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <TopBar />
      <MenuBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
