import React from "react";
import Error403 from "../../components/errors/error403";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";

const Error403Page = () => {
  return (
    <>
      <PageHeader title="Forbidden" />
      <Spacer />
      <Error403 />
      <Spacer />
    </>
  );
};

export default Error403Page;
