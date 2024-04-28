import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import ManagerList from "../../components/dashboard/manager/manager-list";

import { useSelector } from "react-redux";
import NewManagerForm from "../../components/dashboard/manager/new-manager-form";
import EditManagerForm from "../../components/dashboard/manager/edit-manager-form";

const ManagerPage = () => {
  //merkezi state erismek icin
  const { currentOps } = useSelector((state) => state.misc);
  return (
    <>
      <PageHeader title="Manager" />
      <Spacer />

      {currentOps === "new" && (
        <>
          <NewManagerForm />
          <Spacer />
        </>
      )}
      {currentOps === "edit" && (
        <>
          <EditManagerForm />
          <Spacer />
        </>
      )}
      
      <ManagerList />
      <Spacer />
    </>
  );
};

export default ManagerPage;
