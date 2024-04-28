import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import ButtonSpinner from "../../common/button-spinner";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { swalAlert } from "../../../helpers/swal";
import { refreshToken, setOps } from "../../../store/slices/misc-slice";
import { createStudentInfo } from "../../../api/student-info-service";
import { getAllStudentsForAdvisor } from "../../../api/student-service";
import { getAllLessons } from "../../../api/lesson-service";
import { getAllEducationTerms } from "../../../api/education-term-service";
import { config } from "../../../helpers/config";
const NewStudentInfoForm = () => {
  //backend den gelen data esnasinda butona basildiginda calisir
  const [loading, setLoading] = useState(false);
  //merkezi state de degisiklik yapmak icin useDispatch hook kullaniyoruz
  const dispatch = useDispatch();
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);
  const [terms, setTerms] = useState([]);

  const initialValues = {
    absentee: "",
    educationTermId: "",
    finalExam: "",
    infoNote: "",
    lessonId: "",
    midtermExam: "",
    studentId: "",
  };

  const validationSchema = Yup.object({
    absentee: Yup.number()
      .required("Required")
      .min(0, "Must be greater than 0"),
    educationTermId: Yup.string().required("Required"),
    infoNote: Yup.string().required("Required"),
    lessonId: Yup.number().required("Required"),
    midtermExam: Yup.number()
      .required("Required")
      .min(0, "Must be greater than 0")
      .max(100, "Must be less than 100"),
    finalExam: Yup.number()
      .required("Required")
      .min(0, "Must be greater than 0")
      .max(100, "Must be less than 100"),
    studentId: Yup.number().required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true); //butonu disable etmek icin kullanilir

    try {
      await createStudentInfo(values); //bununla backend tarafinda kayit olusturuldu
      dispatch(refreshToken()); //listeyi guncellemek icin kullanilir
      dispatch(setOps(null)); //new formunu kapatmak icin kullanilir
      formik.resetForm(); //formu temizlemek icin kullanilir
      swalAlert("Info created successfully", "success");
    } catch (err) {
      console.log(err);
      const msg = Object.values(err.response.data.validations)[0];
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(setOps(null));
  };

  const loadStudent = async () => {
    try {
      const data = await getAllStudentsForAdvisor();
      setStudents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadLessons = async () => {
    try {
      const data = await getAllLessons();
      setLessons(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTerms = async () => {
    try {
      const data = await getAllEducationTerms();
      setTerms(data);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    loadStudent();
    loadLessons();
    loadTerms();
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
              <Col>
                <FloatingLabel
                  controlId="lesson"
                  label="Lesson"
                  className="mb-3 text-muted"
                >
                  <Form.Select
                    aria-label="Select Lesson"
                    {...formik.getFieldProps("lessonId")}
                    isInvalid={
                      formik.touched.lessonId && formik.errors.lessonId
                    }
                  >
                    <option>Select Lesson</option>
                    {lessons.map((item) => (
                      <option key={item.lessonId} value={item.lessonId}>
                        {item.lessonName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lessonId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="student"
                  label="Student"
                  className="mb-3 text-muted"
                >
                  <Form.Select
                    aria-label="Select Student"
                    {...formik.getFieldProps("studentId")}
                    isInvalid={
                      formik.touched.studentId && formik.errors.studentId
                    }
                  >
                    <option>Select Student</option>
                    {students.map((item) => (
                      <option key={item.id} value={item.userId}>
                        {item.name} {item.surname}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.studentId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="term"
                  label="Education Term"
                  className="mb-3 text-muted"
                >
                  <Form.Select
                    aria-label="Select term"
                    {...formik.getFieldProps("educationTermId")}
                    isInvalid={
                      formik.touched.educationTermId && formik.errors.educationTermId
                    }
                  >
                    <option>Select Term</option>
                    {terms.map((item) => (
                      <option key={item.id} value={item.id}>
                      {config.educationTerms.find((term)=>term.key === item.term).label}  {item.startDate}
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
                  controlId="absentee"
                  label="Absentee"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("absentee")}
                    isInvalid={formik.touched.absentee && formik.errors.absentee}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.absentee}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="midtermExam"
                  label="Midterm"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("midtermExam")}
                    isInvalid={formik.touched.midtermExam && formik.errors.midtermExam}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.midtermExam}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="finalExam"
                  label="Final"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("finalExam")}
                    isInvalid={formik.touched.finalExam && formik.errors.finalExam}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.finalExam}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="infoNote"
                  label="Info"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("infoNote")}
                    isInvalid={formik.touched.infoNote && formik.errors.infoNote}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.infoNote}
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

export default NewStudentInfoForm;
