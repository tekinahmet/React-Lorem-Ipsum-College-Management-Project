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
import { deleteAssistantManager, getAssistantManagersByPage } from "../../../api/assistant-manager-service";

//Lazy loading is a technique for waiting to load certain parts of a webpage — especially images — until they are needed.
const AssistantManagerList = () => {
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
      const response = await getAssistantManagersByPage(lazyState.page, lazyState.rows);
      console.log(response);
      setList(response.content);

      setTotalRecords(response.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
          onClick={() => handleDelete(row.userId)}
        >
          <FaTrash />
        </Button>
      </div>
    );
  };
  const getFullName = (row) => {
    return `${row.name} ${row.surname}`;
  };
  const handleDelete = async (id) => {
    const res = await swalConfirm(
      "Are you sure you want to delete this assistant manager?"
    );
    if (!res.isConfirmed) return;
    setLoading(true);

    try {
      await deleteAssistantManager(id);
      dispatch(refreshToken());
      swalAlert("Assistant Manager deleted successfully", "success");
    } catch (err) {
      const errMsg = err.response.data.message;
      swalAlert(errMsg, "error");
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  //edit butonuna basildiliginda tum bilgi row icine aktarildi
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
  useEffect(() => {
    loadData();
  }, [lazyState, listRefreshToken]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>Assistant Manager List</span>
            <Button onClick={handleNew}>New </Button>
          </Card.Title>
          <DataTable
            value={list}
            lazy
            dataKey="userId"
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRecords}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column body={getFullName} header="Name" />
            <Column field="gender" header="Gender" />
            <Column field="phoneNumber" header="Phone Number" />
            <Column field="ssn" header="SSN" />
            <Column field="username" header="Username" />
            <Column body={getOps} header="Name" />
          </DataTable>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  );
};

export default AssistantManagerList;
