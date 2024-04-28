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
import {
  deleteMeet,
  getAllMeetsByPageForAdvisorTeacher,
} from "../../../api/meet-service";

const MeetList = () => {
  const { listRefreshToken } = useSelector((state) => state.misc);
  const [list, setList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 25, //size
    page: 0,
  });
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const response = await getAllMeetsByPageForAdvisorTeacher(
        lazyState.page,
        lazyState.rows
      );
      console.log(response);
      setList(response.content); //paging li yapılarda geliyor

      setTotalRecords(response.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await swalConfirm(
      "Are you sure you want to delete this meet info?"
    );
    if (!res.isConfirmed) return;
    setLoading(true);

    try {
      await deleteMeet(id);
      dispatch(refreshToken());
      swalAlert("Meet Info deleted successfully", "success");
    } catch (err) {
      const errMsg = err.response.data.message;
      swalAlert(errMsg, "error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    console.log(row);
    dispatch(setCurrentRecord(row));
    dispatch(setOps("edit"));
  };

  const handleNew = () => {
    dispatch(setOps("new"));
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
          onClick={() => handleDelete(row.id)} // row.id => data nasıl geliyorsa o key yazılmalı
        >
          <FaTrash />
        </Button>
      </div>
    );
  };

  useEffect(() => {
    loadData();
  }, [lazyState, listRefreshToken]);

  const getStudents = (row) => {
    return row.students.map((item) => `${item.name} ${item.surname}`).join("-");
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>Meet List</span>
            <Button onClick={handleNew}>New </Button>
          </Card.Title>
          <DataTable
            value={list}
            lazy
            dataKey="id" // data nasıl geliyorsa o key yazılmalı
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRecords}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column body={getStudents} header="Students" />
            <Column field="date" header="Date" />
            <Column field="startTime" header="Start Time" />
            <Column field="stopTime" header="End Time" />
            <Column field="description" header="Description" />

            <Column body={getOps} header="" />
          </DataTable>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  );
};

export default MeetList;
