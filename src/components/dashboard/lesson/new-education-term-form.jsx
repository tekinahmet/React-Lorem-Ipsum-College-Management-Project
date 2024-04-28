import { useState } from "react";
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
import { createEducationTerm } from "../../../api/education-term-service";
import { useFormik } from "formik";

const getTermKeys = () => config.educationTerms.map((item) => item.key);//render gerektirmez, component disi

const NewEducationTermForm = () => {
  //backend den gelen data esnasinda butona basildiginda calisir
  const [loading, setLoading] = useState(false);

  //merkezi state de degisiklik yapmak icin useDispatch hook kullaniyoruz
  const dispatch = useDispatch();

  //formik yapisi
  //backend deki verilerle ayni,
  const initialValues = {
    endDate: "",
    lastRegistrationDate: "",
    startDate: "",
    term: "",
  };
  //yup kullanabilmek icin yup import edilmeli
  //kural koymak icin gerekli
  const validationSchema = Yup.object({
    term: Yup.string().required("Required").oneOf(getTermKeys(), "Invalid Term"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date()
      .required("Required")
      .min(Yup.ref("startDate"), "End Date must be after Start Date"),
    lastRegistrationDate: Yup.date()
      .required("Required")
      .max(
        Yup.ref("startDate"),
        "Last Registration Date must be before Start Date"
      ),
  });

  //values, initialValues degiskeninden geliyor
  const onSubmit = async (values) => {
    setLoading(true); //butonu disable etmek icin kullanilir

    try {
      await createEducationTerm(values); //bununla backend tarafinda kayit olusturuldu
      dispatch(refreshToken()); //listeyi guncellemek icin kullanilir
      dispatch(setOps(null)); //new formunu kapatmak icin kullanilir
      formik.resetForm(); //formu temizlemek icin kullanilir
      swalAlert("Education term created successfully", "success");
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

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
              <Col>
                <FloatingLabel
                  controlId="term"
                  label="Term"
                  className="mb-3 text-muted"
                >
                  <Form.Select
                    aria-label="Education Term"
                    {...formik.getFieldProps("term")}
                    isInvalid={formik.touched.term && formik.errors.term}
                  >
                    <option>Select</option>
                    {config.educationTerms.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.term}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="startDate"
                  label="Start Date"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("startDate")}
                    isInvalid={
                      formik.touched.startDate && formik.errors.startDate
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.startDate}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="endDate"
                  label="End Date"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("endDate")}
                    isInvalid={formik.touched.endDate && formik.errors.endDate}
                    min={formik.values.startDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.endDate}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="lastRegistrationDate"
                  label="Last Registration Date"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    max={formik.values.startDate}
                    {...formik.getFieldProps("lastRegistrationDate")}
                    isInvalid={
                      formik.touched.lastRegistrationDate &&
                      formik.errors.lastRegistrationDate
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lastRegistrationDate}
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

export default NewEducationTermForm;
