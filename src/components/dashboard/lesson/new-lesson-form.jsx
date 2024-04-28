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
import { useFormik } from "formik";
import { createLesson } from "../../../api/lesson-service";

const NewLessonForm = () => {
  //backend den gelen data esnasinda butona basildiginda calisir
  const [loading, setLoading] = useState(false);

  //merkezi state de degisiklik yapmak icin useDispatch hook kullaniyoruz
  const dispatch = useDispatch();

  //formik yapisi
  //backend deki verilerle ayni,
  const initialValues = {
    lessonName: "",
    creditScore: "",
    compulsory: "",
  };
  //compulsory checkbox oldugu icin validate etmeye gerek yok
  //yup kullanabilmek icin yup import edilmeli
  //kural koymak icin gerekli
  const validationSchema = Yup.object({
    lessonName: Yup.string().required("Required"),
    creditScore: Yup.number()
      .required("Required")
      .min(0, "Must be greater than or equal to 0")
      .max(100, "Must be less than or equal to 100"),
  });

  //values, initialValues degiskeninden geliyor
  const onSubmit = async (values) => {
    setLoading(true); //butonu disable etmek icin kullanilir

    try {
      await createLesson(values); //bununla backend tarafinda kayit olusturuldu
      dispatch(refreshToken()); //listeyi guncellemek icin kullanilir
      dispatch(setOps(null)); //new formunu kapatmak icin kullanilir
      formik.resetForm(); //formu temizlemek icin kullanilir
      swalAlert("Lesson created successfully", "success");
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
            <Row xs={1} sm={2} md={3} className="g-3">
              <Col>
                <FloatingLabel
                  controlId="lessonName"
                  label="Lesson Name"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("lessonName")}
                    isInvalid={
                      formik.touched.lessonName && formik.errors.lessonName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lessonName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col> 
                <FloatingLabel
                  controlId="creditScore"
                  label="Credit Score"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("creditScore")}
                    isInvalid={
                      formik.touched.creditScore && formik.errors.creditScore
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.creditScore}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <Form.Check
                // label calismasi icin id gerekli
                  id="compulsory"
                  type="checkbox"
                  label="Compulsory"
                  {...formik.getFieldProps("compulsory")}
                />
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

export default NewLessonForm;
