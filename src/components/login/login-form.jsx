import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import PasswordInput from "../common/password-input";
import { login } from "../../api/auth-service";
import ButtonSpinner from "../common/button-spinner";
import { useDispatch } from "react-redux";
// import { setLocalStorage } from "../../helpers/encrypted-storage";
import { signIn } from "../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import { swalAlert } from "../../helpers/swal";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValues = {
    username: "roo",
    password: "123456Aa.",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      //login servicenin çağırılması
      const user = await login(values);

      //token çekilmesi
      const { token } = user;

      //local storage e yerlestir
      localStorage.setItem("token", token);
      // setLocalStorage.setItem("token", token);

      //merkezi state i güncelle
      dispatch(signIn(user));
      //dispatch reducer i calistirir
      //dispatch i calistirmak icin useDispatch hook kullaniyoruz

      //navigate, useNavigate()
      navigate("/dashboard");
      //state i gormek icin redux a bakilabilir

    } catch (err) {
      console.log(err);
      const errMessage = err.response.data.message
      swalAlert(errMessage, "error");

    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow border-0 border-top border-3 border-primary">
            <Card.Body>
              <div className="mb-4 mt-3 text-muted fst-italic">
                Please enter your username and password
              </div>

              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    {...formik.getFieldProps("username")}
                    isValid={formik.touched.username && !formik.errors.username}
                    isInvalid={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <PasswordInput
                    {...formik.getFieldProps("password")}
                    isValid={formik.touched.password && !formik.errors.password}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                    error={formik.errors.password}
                  />
                </Form.Group>

                <Button
                  className="w-100"
                  variant="primary"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                >
                  {loading && <ButtonSpinner />} Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
