import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshToken,
  setCurrentRecord,
  setOps,
} from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/swal";
import Spacer from "../../common/spacer";
import { deleteStudentInfo, getStudentInfoByPageForTeacher } from "../../../api/student-info-service";

const StudentInfoList = () => {

  const { listRefreshToken } = useSelector((state) => state.misc);
  const [list, setList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 25,
    page: 0,
  });

  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const response = await getStudentInfoByPageForTeacher(lazyState.page, lazyState.rows);
      console.log(response);
      setList(response.content);

      setTotalRecords(response.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await swalConfirm(
      "Are you sure you want to delete this?"
    );
    if (!res.isConfirmed) return;
    setLoading(true);

    try {
      await deleteStudentInfo(id);
      dispatch(refreshToken());
      swalAlert("Student Info deleted successfully", "success");
    } catch (err) {
      const errMsg = err.response.data.message;
      swalAlert(errMsg, "error");
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    dispatch(setOps("new"));
  };

  const handleEdit = (row) => {
    console.log(row);
    dispatch(setCurrentRecord(row));
    dispatch(setOps("edit"));
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  const getOps = (row) => {
    console.log(row);
    return (
      <div>
        <Button
          variant="warning"
          size="sm"
          disabled={row.built_in}
          onClick={() => handleEdit(row)}
          className="me-2"
        >
          <FaEdit />
        </Button>
        <Button
          variant="danger"
          size="sm"
          disabled={row.built_in}
          onClick={() => handleDelete(row.id)}
        >
          <FaTrash />
        </Button>
      </div>
    );
  };

  useEffect(() => {
    loadData();
  }, [lazyState, listRefreshToken]);

  const getFullName = (row) => {
    return `${row.studentResponse.name} ${row.studentResponse.surname}`;
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>Student Info List</span>
            <Button onClick={handleNew}> New </Button>
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
            <Column body={getFullName} header="Name" />
            <Column field="lessonName" header="Lesson" />
            <Column field="absentee" header="Absentee" />
            <Column field="midtermExam" header="Midterm Exam" />
            <Column field="finalExam" header="Final Exam" />
            <Column field="note" header="Score" />
            <Column field="infoNote" header="Info" />
            <Column field="average" header="Average" />
            <Column body={getOps} header="Name" />
          </DataTable>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  )
}

export default StudentInfoList