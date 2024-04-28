import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getAllMeetsByStudent } from "../../../api/meet-service";
import Spacer from "../../common/spacer";


const StudentMeetList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);


  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getAllMeetsByStudent ();
      setList(response);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getStudents = (row) => {
    return row.students.map((item) => `${item.name} ${item.surname}`).join("-");
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>Meets</span>
          </Card.Title>
          <DataTable
            value={list}
            dataKey="id" // data nasıl geliyorsa o key yazılmalı
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="date" header="Date" />
            <Column field="startTime" header="Start Time" />
            <Column field="stopTime" header="End Time" />
            <Column field="description" header="Description" />

          </DataTable>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  );
};

export default StudentMeetList;
