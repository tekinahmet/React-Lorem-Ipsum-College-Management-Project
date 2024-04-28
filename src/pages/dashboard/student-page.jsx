import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { useSelector } from "react-redux";
import StudentList from "../../components/dashboard/student/student-list";
import NewStudentForm from "../../components/dashboard/student/new-student-form";
import EditStudentForm from "../../components/dashboard/student/edit-student-form";

const StudentPage = () => {
  //merkezi state erismek icin
  const { currentOps } = useSelector((state) => state.misc);
  return (
    <>
      <PageHeader title="Student" />
      <Spacer />
      {currentOps === "new" && (
        <>
          <NewStudentForm />
          <Spacer />
        </>
      )}
      {currentOps === "edit" && (
        <>
          <EditStudentForm />
          <Spacer />
        </>
      )}
      <StudentList />
      <Spacer />
    </>
  );
};

export default StudentPage;
