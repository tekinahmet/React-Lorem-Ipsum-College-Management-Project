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
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { swalAlert } from "../../../helpers/swal";
import { refreshToken, setOps } from "../../../store/slices/misc-slice";
import { MultiSelect } from "primereact/multiselect";
import { getAllLessonPrograms } from "../../../api/lesson-program-service";
import { getTeacherById, updateTeacher } from "../../../api/teacher-service";

const EditTeacherForm = () => {
  //backend den gelen data esnasinda butona basildiginda calisir
  const [loading, setLoading] = useState(false);
  //merkezi state de degisiklik yapmak icin useDispatch hook kullaniyoruz
  const dispatch = useDispatch();
  const [lessonPrograms, setLessonPrograms] = useState([]);
  const { currentRecord } = useSelector((state) => state.misc);

  const initialValues = {
    ...currentRecord, //formik te enableReinitialize:true ile daha dinamik hale geliyor
    password: "",
    confirmPassword: "",
    lessonsIdList: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    gender: Yup.string()
      .required("Required")
      .oneOf(["MALE", "FEMALE"], "Invalid Gender"),
    birthDay: Yup.date().required("Required"),
    birthPlace: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/\d{3}-\d{3}-\d{4}/g, "Invalid phone"),
    ssn: Yup.string()
      .required("Required")
      .matches(/\d{3}-\d{2}-\d{4}/g, "Invalid ssn"),
    username: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]+/g, "Must contain at least one lowercase character")
      .matches(/[A-Z]+/g, "Must contain at least one uppercase character")
      .matches(/\d+/g, "Must contain at least one number"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Password does not match"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format, abc@xyz.com"
      ),
    lessonsIdList: Yup.array().min(1, "Please select at least one lesson"),
  });
  const onSubmit = async (values) => {
    setLoading(true); //butonu disable etmek icin kullanilir

    const payload = {
      ...values,
      isAdvisorTeacher: values.advisorTeacher,
    };
    delete payload.advisorTeacher;
    try {
      await updateTeacher(payload); //bununla backend tarafinda kayit olusturuldu
      dispatch(refreshToken()); //listeyi guncellemek icin kullanilir
      dispatch(setOps(null)); //new formunu kapatmak icin kullanilir
      formik.resetForm(); //formu temizlemek icin kullanilir
      swalAlert("Teacher updated successfully", "success");
    } catch (err) {
      console.log(err);
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
    enableReinitialize: true, //initialValues degiskeninde ...currentRecord oldugu icin initialize edilmesi gerekiyor
  });
  const loadLessonPrograms = async () => {
    try {
      const data = await getAllLessonPrograms();
      const arr = data.map((item) => ({
        id: item.lessonProgramId,
        label: item.lessonName.map((item) => item.lessonName).join("-"),
      }));
      //join("-") => diziyi stringe cevirir
      setLessonPrograms(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const getTeacherPrograms = async () => {
    try {
      const data = await getTeacherById(currentRecord.userId);
      const arr = data.object.lessonsProgramList.map((item) => item.id);
      formik.setFieldValue("lessonsIdList", arr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadLessonPrograms();
  }, []);
  useEffect(() => {
    getTeacherPrograms();
  }, [currentRecord]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Edit</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
              <Col>
                <FloatingLabel
                  controlId="firstName"
                  label="First Name"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("name")}
                    isInvalid={formik.touched.name && formik.errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="lastName"
                  label="Last Name"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("surname")}
                    isInvalid={formik.touched.surname && formik.errors.surname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.surname}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="gender"
                  label="Gender"
                  className="mb-3 text-muted"
                >
                  <Form.Select
                    aria-label="Select Gender"
                    {...formik.getFieldProps("gender")}
                    isInvalid={formik.touched.gender && formik.errors.gender}
                  >
                    <option>Select Gender</option>
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.gender}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="birthDay"
                  label="Birthday"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("birthDay")}
                    isInvalid={
                      formik.touched.birthDay && formik.errors.birthDay
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.birthDay}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="birthPlace"
                  label="Place of Birth"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("birthPlace")}
                    isInvalid={formik.touched.name && formik.errors.birthPlace}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.birthPlace}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="phoneNumber"
                  label="Phone Number"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    as={InputMask}
                    mask="999-999-9999"
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("phoneNumber")}
                    isInvalid={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.phoneNumber}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="ssn"
                  label="SSN"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    as={InputMask}
                    mask="999-99-9999"
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("ssn")}
                    isInvalid={formik.touched.ssn && formik.errors.ssn}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.ssn}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="email"
                  label="Email"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="text" //html5 kontrolu
                    placeholder=""
                    {...formik.getFieldProps("email")}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="username"
                  label="Username"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("username")}
                    isInvalid={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="password"
                  label="Password"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Confirm Password"
                  className="mb-3 text-muted"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("confirmPassword")}
                    isInvalid={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <MultiSelect
                  value={formik.values.lessonsIdList}
                  onChange={(e) =>
                    formik.setFieldValue("lessonsIdList", e.value)
                  }
                  options={lessonPrograms}
                  optionValue="id"
                  optionLabel="label"
                />
              </Col>
              <Col>
                <Form.Check
                  id="isAdvisor"
                  type="checkbox"
                  label="is an Advisor Teacher"
                  checked={formik.values.advisorTeacher}
                  {...formik.getFieldProps("advisorTeacher")}
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
                  {loading && <ButtonSpinner />} Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditTeacherForm;
