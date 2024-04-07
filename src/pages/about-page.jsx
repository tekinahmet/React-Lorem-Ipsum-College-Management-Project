import React from "react";
import Welcome from "../components/about/welcome";
import Spacer from "../components/common/spacer";
import PageHeader from "../components/common/page-header";
import Instructors from "../components/about/instructors";

const AboutPage = () => {
  return (
    <>
      <PageHeader title="About Us" />
      <Spacer />
      <Welcome />
      <Spacer />
      <Instructors />
      <Spacer />
    </>
  );
};

export default AboutPage;
