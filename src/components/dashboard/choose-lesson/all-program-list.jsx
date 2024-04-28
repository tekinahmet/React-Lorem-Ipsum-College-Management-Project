import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Spacer from "../../common/spacer";
import { setOps, refreshToken } from "../../../store/slices/misc-slice";
import { swalAlert } from "../../../helpers/swal";
import {
  getAllLessonProgramByStudent,
  getAllLessonPrograms,
} from "../../../api/lesson-program-service";
import { chooseLesson } from "../../../api/student-service";

const AllProgramList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const dispatch = useDispatch();
  const { listRefreshToken } = useSelector((state) => state.misc);


  const loadData = async () => {
    try {
      const dataAll = await getAllLessonPrograms();
      const dataAssigned = await getAllLessonProgramByStudent();

      const dataUnassigned = dataAll.filter(
        (item) =>
          !dataAssigned.some((i) => i.lessonProgramId === item.lessonProgramId)
      );

      setList(dataUnassigned);
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
  const handleSelect = async () => {
    setLoading(true);
    try {
      if (selectedPrograms.length <= 0)
        throw new Error("Please select at least one lesson.");

      const payload = {
        lessonProgramId: selectedPrograms.map((item) => item.lessonProgramId),
      };

      await chooseLesson(payload);
      dispatch(refreshToken());
      swalAlert("Assigned successfully", "success");

      setSelectedPrograms([]);
      dispatch(setOps(payload));
      dispatch(refreshToken());
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>Unassigned Programs</span>
          </Card.Title>
          <DataTable
            value={list} //list state e bagli
            dataKey="lessonProgramId"
            selection={selectedPrograms} //secili satirlari tutar
            onSelectionChange={(e) => setSelectedPrograms(e.value)} //secili satirlari set eder
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column selectionMode="multiple" header="" />
            {/* birden fazla secim yapilabilmesi icin */}
            <Column body={getLessonNames} header="Lessons" />
            <Column body={getTeacherNames} header="Teachers" />
            <Column field="day" header="Day" />
            <Column field="startTime" header="Start Time" />
            <Column field="stopTime" header="Stop Time" />
          </DataTable>
          <div className="text-center mt-3">
            <Button variant="outline-primary" size="lg" onClick={handleSelect}>
              Select
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Spacer />
    </Container>
  );
};

export default AllProgramList;
