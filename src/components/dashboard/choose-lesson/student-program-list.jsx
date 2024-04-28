import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Spacer from "../../common/spacer";
import { getAllLessonProgramByStudent } from "../../../api/lesson-program-service";
import { useSelector } from "react-redux";

const StudentProgramList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { listRefreshToken } = useSelector((state) => state.misc);

  const loadData = async () => {
    try {
      const response = await getAllLessonProgramByStudent();
      setList(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [listRefreshToken]);

  const getLessonNames = (row) => {
    return row.lessonName.map((item) => item.lessonName).join("-");
    //diziyi stringe cevirir
  };
  const getTeacherNames = (row) => {
    return row.teachers.map((item) => `${item.name} ${item.surname}`).join("-");
    //diziyi stringe cevirir
  };



  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>Assigned Programs</span>
          </Card.Title>
          <DataTable
            value={list} //list state e bagli
            dataKey="lessonProgramId"
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column body={getLessonNames} header="Lessons" />
            <Column body={getTeacherNames} header="Teachers" />
            <Column field="day" header="Day" />
            <Column field="startTime" header="Start Time" />
            <Column field="stopTime" header="Stop Time" />
          </DataTable>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  );
};

export default StudentProgramList;
