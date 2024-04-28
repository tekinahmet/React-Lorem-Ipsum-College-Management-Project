import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import Spacer from "../../common/spacer";
import { setOps, refreshToken } from "../../../store/slices/misc-slice";
import {} from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/swal";
import { deleteLesson, getLessonsByPage } from "../../../api/lesson-service";
//Lazy loading is a technique for waiting to load certain parts of a webpage — especially images — until they are needed.
const LessonList = () => {
  //listRefreshToken: silmelerde, guncellemelerde, yeni eklemelerde listeyi guncellemek icin kullanilir. navigate yapilarak da listeyi guncellemek mumkundur
  const { listRefreshToken } = useSelector((state) => state.misc);

  //backend den gelecek education term listesini tutar
  const [list, setList] = useState([]);

  //toplam kayitlari tutar
  const [totalRecords, setTotalRecords] = useState(0);

  //loading olurken spinner olarak gosterilir
  const [loading, setLoading] = useState(true);

  //paging deki degerleri tutar
  const [lazyState, setlazyState] = useState({
    first: 0, //ilk baslayacak sayfa
    rows: 25, //kac satir gosterilecek
    page: 0, //hangi sayfa aktif
  });

  //merkezi state de degisiklik yapmak istiyorsak useDispatch hook kullaniyoruz, dispatch reducer i calistirir
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const response = await getLessonsByPage(lazyState.page, lazyState.rows);
      setList(response.content); //backend den gelen listeyi set eder, list e aktarir
      setTotalRecords(response.totalElements); //toplam kayit sayisini set eder, toplam kayit sayisini tutar
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await swalConfirm(
      "Are you sure you want to delete this lesson?"
    );
    if (!res.isConfirmed) return;
    setLoading(true);
    try {
      await deleteLesson(id);
      dispatch(refreshToken()); //liste yi guncellemek icin kullanilir
      swalAlert("Lesson deleted successfully", "success");
    } catch (err) {
      const errMsg = err.response.data.message;
      swalAlert(errMsg, "error");
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
          variant="danger"
          size="sm"
          disabled={row.built_in}
          onClick={() => handleDelete(row.lessonId)}
        >
          <FaTrash />
        </Button>
      </div>
    );
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

const getCompulsory = (row) => { 
  return row.compulsory ? <FaCheck className="text-success"/> : <FaTimes className="text-danger"/>;
 }
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>Lesson List</span>
            <Button onClick={handleNew}>New </Button>
          </Card.Title>
          <DataTable
            value={list}
            lazy
            dataKey="lessonId"
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRecords}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="lessonName" header="Lesson Name" />
            <Column field="creditScore" header="Credit Score" />
            <Column body={getCompulsory} header="Compulsory" />
            <Column body={getOps} header="Name" />
          </DataTable>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  );
};

export default LessonList;
