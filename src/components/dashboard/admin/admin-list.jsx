import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { deleteAdmin, getAdminsByPage } from "../../../api/admin-service";
import Spacer from "../../common/spacer";
import { FaTrash } from "react-icons/fa";
import { swalConfirm, swalAlert } from "../../../helpers/swal";

const AdminList = () => {
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
      const response = await getAdminsByPage(lazyState.page, lazyState.rows);
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
      "Are you sure you want to delete this admin?"
    );
    if (!res.isConfirmed) return;
    setLoading(true);

    try {
      await deleteAdmin(id);
      swalAlert("Admin deleted successfully", "success");
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

  /* const getFullName = (row)=>{
    return `${row.name} ${row.surname}`
} */
  const getOps = (row) => {
    console.log(row);
    return (
      <div>
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
  //disabled={row.built_in} backend tarafinda true olanlar disabled edilecek

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-center">
              <span>Admin List</span>
              <Button>New Admin</Button>
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
              <Column
                body={(row) => {
                  return `${row.name} ${row.surname}`;
                }}
                header="Name"
              />
              <Column field="gender" header="Gender" />
              <Column field="phoneNumber" header="Phone Number" />
              <Column field="ssn" header="SSN" />
              <Column field="username" header="Username" />
              <Column body={getOps} header="Name" />
            </DataTable>
          </Card.Body>
        </Card>
      </Container>
      <Spacer height={75} />
    </>
  );
};

export default AdminList;
