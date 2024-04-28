import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { config } from "../../../helpers/config";
import ButtonSpinner from "../../common/button-spinner";
import { swalAlert } from "../../../helpers/swal";
import { refreshToken, setOps } from "../../../store/slices/misc-slice";
import { useFormik } from "formik";
import { createLessonProgram } from "../../../api/lesson-program-service";
import { MultiSelect } from "primereact/multiselect";
import { getAllLessons } from "../../../api/lesson-service";
import { getAllEducationTerms } from "../../../api/education-term-service";

const NewLessonProgramForm = () => {
  //backend den gelen data esnasinda butona basildiginda calisir
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [terms, setTerms] = useState([]);

  //merkezi state de degisiklik yapmak icin useDispatch hook kullaniyoruz
  const dispatch = useDispatch();

  //formik yapisi
  //backend deki verilerle ayni,
  const initialValues = {
    day: "",
    educationTermId: "",
    lessonIdList: [],
    startTime: "",
    stopTime: "",
  };
  //yup kullanabilmek icin yup import edilmeli
  //kural koymak icin gerekli
  const validationSchema = Yup.object({
    lessonIdList: Yup.array().required("Required"),
    day: Yup.string().oneOf(config.days, "Invalid Day"),
    educationTermId: Yup.string().required("Required"),
    startTime: Yup.string().required("Required"),
    stopTime: Yup.string()
      .required("Required"),
  });

  //values, initialValues degiskeninden geliyor
  const onSubmit = async (values) => {
    setLoading(true); //butonu disable etmek icin kullanilir

    try {
      await createLessonProgram(values); //bununla backend tarafinda kayit olusturuldu
      dispatch(refreshToken()); //listeyi guncellemek icin kullanilir
      dispatch(setOps(null)); //new formunu kapatmak icin kullanilir
      formik.resetForm(); //formu temizlemek icin kullanilir
      swalAlert("Lesson Program created successfully", "success");
    } catch (err) {
      const msg = err.response.data.message;
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    dispatch(setOps(null));
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const loadLessons = async () => {
    try {
      const data = await getAllLessons();
      setLessons(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadEducationTerms = async () => {
    try {
      const data = await getAllEducationTerms();
      setTerms(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadLessons();
    loadEducationTerms();
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row xs={1} sm={2} md={3} className="g-3">
              <Col>
                <MultiSelect
                  value={formik.values.lessonIdList}
                  onChange={(e) =>
                    formik.setFieldValue("lessonIdList", e.value)
                  }
                  options={lessons}
                  optionLabel="lessonName"
                  optionValue="lessonId"
                  placeholder="Select Lessons"
                />
              </Col>

              <Col>
                <FloatingLabel
                  controlId="educationTermId"
                  label="Education Term"
                  className="mb-3 text-muted"
                >
                  <Form.Select
                    aria-label="Education Term"
                    {...formik.getFieldProps("educationTermId")}
                    isInvalid={
                      formik.touched.educationTermId &&
                      formik.errors.educationTermId
                    }
                  >
                    <option>Select</option>
                    {terms.map((item) => (
                      <option key={item.id} value={item.id}>
                        {config.educationTerms.find((term) => term.key === item.term).label} {item.startDate}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.educationTermId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="day"
                  label="Day"
                  className="mb-3 text-muted"
                >
                  <Form.Select
                    aria-label="Day"
                    {...formik.getFieldProps("day")}
                    isInvalid={formik.touched.day && formik.errors.day}
                  >
                    <option>Select</option>
                    {config.days.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.day}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="startTime"
                  label="Start Time"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("startTime")}
                    isInvalid={
                      formik.touched.startTime && formik.errors.startTime
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.startTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="stopTime"
                  label="Stop Time"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("stopTime")}
                    isInvalid={
                      formik.touched.stopTime && formik.errors.stopTime
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.stopTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <Button
                  variant="outline-secondary"
                  className="me-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                >
                  {loading && <ButtonSpinner />}Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewLessonProgramForm;
