import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import Spacer from "../../common/spacer";
import { setOps, refreshToken } from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/swal";
import {
  deleteLessonProgram,
  getLessonProgramsByPage,
} from "../../../api/lesson-program-service";

//Lazy loading is a technique for waiting to load certain parts of a webpage — especially images — until they are needed.
const LessonProgramList = () => {
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
      const response = await getLessonProgramsByPage(
        lazyState.page,
        lazyState.rows
      );
      setList(response.content); //backend den gelen listeyi set eder, list e aktarir. content paging li yapılarda geliyor
      setTotalRecords(response.totalElements); //toplam kayit sayisini set eder, toplam kayit sayisini tutar
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await swalConfirm(
      "Are you sure you want to delete this lesson program?"
    );
    if (!res.isConfirmed) return;
    setLoading(true);
    try {
      await deleteLessonProgram(id);
      dispatch(refreshToken()); //liste yi guncellemek icin kullanilir
      swalAlert("Lesson Program deleted successfully", "success");
    } catch (err) {
      const errMsg = err.response.data.message;
      swalAlert(errMsg, "error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  const getOps = (row) => {
    console.log(row);
    return (
      <div>
        <Button
          variant="danger"
          size="sm"
          disabled={row.built_in}
          onClick={() => handleDelete(row.lessonProgramId)}
        >
          <FaTrash />
        </Button>
      </div>
    );
  };

  const handleNew = () => {
    dispatch(setOps("new"));
  };

  useEffect(() => {
    loadData();
  }, [lazyState, listRefreshToken]);

  const getLessonNames = (row) => {
    return row.lessonName.map((item) => item.lessonName).join("-");
    //diziyi stringe cevirir
  };
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>Lesson Program List</span>
            <Button onClick={handleNew}>New </Button>
          </Card.Title>
          <DataTable
            value={list}
            lazy
            dataKey="lessonProgramId"
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRecords}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column body={getLessonNames} header="Lessons" />
            <Column field="day" header="Day" />
            {/* <Column field="startTime" header="Start Time" /> */}
            <Column field="startTime" header="Start Time" />
            <Column field="stopTime" header="Stop Time" />
            <Column body={getOps} header="Name" />
          </DataTable>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  );
};

export default LessonProgramList;
