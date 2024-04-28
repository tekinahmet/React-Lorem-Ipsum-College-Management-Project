import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import {Card, Container } from "react-bootstrap";
import { getStudentInfoByPageForStudent } from "../../../api/student-info-service";
import Spacer from "../../common/spacer";


const GradeList = () => {

  const [list, setList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 25,
    page: 0,
  });


  const loadData = async () => {
    try {
      const response = await getStudentInfoByPageForStudent(lazyState.page, lazyState.rows);
      console.log(response);
      setList(response.content);

      setTotalRecords(response.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => {
    setlazyState(event);
  };


  useEffect(() => {
    loadData();
  }, [lazyState]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>Student Info List</span>
          </Card.Title>
          <DataTable
            value={list}
            lazy
            dataKey="id"
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRecords}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="lessonName" header="Lesson" />
            <Column field="absentee" header="Absentee" />
            <Column field="midtermExam" header="Midterm Exam" />
            <Column field="finalExam" header="Final Exam" />
            <Column field="note" header="Score" />
            <Column field="infoNote" header="Info" />
            <Column field="average" header="Average" />
          </DataTable>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  )
}

export default GradeList