import React, { useEffect } from "react";
import TopBar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";
import Footer from "../components/common/footer";
import { Outlet, useLocation } from "react-router-dom";
import { scrollTop } from "../helpers/scroll";
import ScrollToTopButton from "../components/common/scroll-to-top-button";

const UserLayout = () => {

  const {pathname} = useLocation();

useEffect(() => {
 scrollTop();
}, [pathname])


  return (
    <>
      <TopBar />
      <MenuBar />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default UserLayout;
