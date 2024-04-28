import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import EducationTermList from "./education-term-list";
import Spacer from "../../common/spacer";
import NewEducationTermForm from "./new-education-term-form";
import { useSelector } from "react-redux";
import LessonList from "./lesson-list";
import NewLessonForm from "./new-lesson-form";
import LessonProgramList from "./lesson-program-list";
import NewLessonProgramForm from "./new-lesson-program-form";
import LessonAssignment from "./lesson-assignment";

const LessonTabs = () => {
  const [key, setKey] = useState("terms");
  const { currentOps } = useSelector((state) => state.misc); //new butonuna baglamak icin useSelector kullaniyoruz merkezi state e ulasmak icin

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      fill={true}
    >
      <Tab eventKey="terms" title="Education Terms">
        <Spacer height={35} />

        {currentOps === "new" && (
          <>
            <NewEducationTermForm />
            <Spacer height={35} />
          </>
        )}

        <EducationTermList />
      </Tab>
      <Tab eventKey="lessons" title="Lessons">
        <Spacer height={35} />
        {currentOps === "new" && (
          <>
            <NewLessonForm />
            <Spacer height={35} />
          </>
        )}
        <LessonList />
      </Tab>
      <Tab eventKey="programs" title="Lesson Programs">
        <Spacer height={35} />
        {currentOps === "new" && (
          <>
            <NewLessonProgramForm />
            <Spacer height={35} />
          </>
        )}
        <LessonProgramList />
        <Spacer height={35} />
        <LessonAssignment />
      <Spacer />
      </Tab>
    </Tabs>
  );
};

export default LessonTabs;
// controlled-tab-example olmalı
