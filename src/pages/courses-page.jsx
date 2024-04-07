import React from "react";
import Courses from "../components/courses/courses";
import Spacer from "../components/common/spacer";
import PageHeader from "../components/common/page-header";

const CoursesPage = () => {
  return (
    <div>
      <PageHeader title="Courses" />
      <Spacer />
      <Courses />
      <Spacer />
    </div>
  );
};

export default CoursesPage;
