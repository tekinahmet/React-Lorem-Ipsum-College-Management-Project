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
import InputMask from "react-input-mask-next";
import ButtonSpinner from "../../common/button-spinner";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { swalAlert } from "../../../helpers/swal";
import { refreshToken, setOps } from "../../../store/slices/misc-slice";
import { MultiSelect } from "primereact/multiselect";
import { createMeet } from "../../../api/meet-service";
import { getAllStudentsForAdvisor } from "../../../api/student-service";

const NewMeetForm = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();

  const initialValues = {
    description: "",
    date: "",
    startTime: "",
    stopTime: "",
    studentIds: [],
  };

  const validationSchema = Yup.object({
    date: Yup.date().required("Required"),
    startTime: Yup.string().required("Required"),
    description: Yup.string()
      .required("Required")
      .min(2, "at least 2 characters")
      .max(16, "at most 16 characters"),
    stopTime: Yup.string().required("Required"),
    studentIds: Yup.array().min(1, "At least one student is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true); //butonu disable etmek icin kullanilir

    try {
      await createMeet(values); //bununla backend tarafinda kayit olusturuldu
      dispatch(refreshToken()); //listeyi guncellemek icin kullanilir
      dispatch(setOps(null)); //new formunu kapatmak icin kullanilir
      formik.resetForm(); //formu temizlemek icin kullanilir
      swalAlert("Meet Info created successfully", "success");
    } catch (err) {
      console.log(err);
      const msg = Object.values(err.response.data.validations)[0];
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleCancel = () => {
    dispatch(setOps(null));
  };

  const loadStudents = async () => {
    try {
      const data = await getAllStudentsForAdvisor();
      const arr = data.map((item) => ({
        //multiselect icin data icindeki id ve label icin yeni bir dizi olusturuldu
        id: item.userId,
        label: `${item.name} ${item.surname}`,
      }));
      setStudents(arr);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="g-3">
              <Col xs={12}>
                <MultiSelect
                  value={formik.values.studentIds} //secili olanlari getiriyor
                  onChange={(e) => formik.setFieldValue("studentIds", e.value)}
                  options={students} //loadstudents den gelen datamiz
                  optionValue="id"
                  optionLabel="label"
                />
              </Col>

              <Col md={4}>
                <FloatingLabel
                  controlId="date"
                  label="Date"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("date")}
                    isInvalid={formik.touched.date && formik.errors.date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.date}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col md={4}>
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

              <Col md={4}>
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

              <Col>
                <FloatingLabel
                  controlId="description"
                  label="Description"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("description")}
                    isInvalid={
                      formik.touched.description && formik.errors.description
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
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

export default NewMeetForm;
