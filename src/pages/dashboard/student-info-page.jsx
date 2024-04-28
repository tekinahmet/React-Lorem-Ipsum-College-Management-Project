import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { useSelector } from "react-redux";
import StudentInfoList from "../../components/dashboard/student-info/student-info-list";
import NewStudentInfoForm from "../../components/dashboard/student-info/new-student-info-form";
import EditStudentInfoForm from "../../components/dashboard/student-info/edit-student-info-form";

const StudentInfoPage = () => {
  //merkezi state erismek icin
  const { currentOps } = useSelector((state) => state.misc);
  return (
    <>
      <PageHeader title="Student Info" />
      <Spacer />
      {currentOps === "new" && (
        <>
          <NewStudentInfoForm />
          <Spacer />
        </>
      )}
      {currentOps === "edit" && (
        <>
          <EditStudentInfoForm />
          <Spacer />
        </>
      )}
      <StudentInfoList />
      <Spacer />
    </>
  );
};

export default StudentInfoPage;
