import React from "react";
import Error404 from "../../components/errors/error404";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";

const Error404Page = () => {
  return (
    <div>
      <PageHeader title="Page Not Found" />
      <Spacer />
      <Error404 />
      <Spacer />
    </div>
  );
};

export default Error404Page;
