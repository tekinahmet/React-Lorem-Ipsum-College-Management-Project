import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getMessagesByPage } from "../../../api/contact-service";
import Spacer from "../../common/spacer";

const ContactMessageList = () => {
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
          const response = await getMessagesByPage(lazyState.page, lazyState.rows);
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
            <span>Messages</span>
          </Card.Title>
          <DataTable
            value={list}
            lazy
            dataKey={()=> Math.random()} //unique bir deger olmadigi icin arrow function kullandik
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRecords}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="name" header="Name" />
            <Column field="email" header="Email" />
            <Column field="date" header="Date" />
            <Column field="subject" header="Subject" />
            <Column field="message" header="Message" />
          </DataTable>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  )
}

export default ContactMessageList