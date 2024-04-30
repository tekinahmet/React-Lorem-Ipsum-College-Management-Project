import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiMessage, BiTag, BiSend } from "react-icons/bi";
import * as Yup from "yup";
import { useFormik } from "formik";
import ButtonSpinner from "../common/button-spinner";
import { createMessage } from "../../api/contact-service";
import { swalAlert } from "../../helpers/swal";
import "./contact-form.scss";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  //formik ve yup import edilmelidir
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(4, "Must be minimum 4 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format, abc@xyz.com"
      ),
    subject: Yup.string()
      .required("Required")
      .min(4, "Must be minimum 4 characters")
      .max(20, "Must be maximum 20 characters"),
    message: Yup.string()
      .required("Required")
      .min(4, "Must be minimum 4 characters")
      .max(50, "Must be maximum 50 characters"),
  });

  const onSubmit = async (values) => {
    //asenkron olduğu için async ve await kullanılır
    setLoading(true);
    try {
      await createMessage(values); //await ile createMessage fonksiyonu çağırılır
      formik.resetForm(); //formu sıfırlar.
      swalAlert("Message sent successfully");
    } catch (err) {
      const errMsg = Object.values(err.response.data.validations)[0];
      //hata mesajını array olarak alacaksak, mesaj object olduğu için Object.values kullanılır, mesaj backend den geliyor
      swalAlert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  //noValidate ile html5 validasyonu kaldırılmıştır
  //onSubmit ile form submit edildiğinde fonksiyon çağırılır
  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="contact-form">
      <h2>Send Me Message</h2>
      <Row>
        <Col md={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="name">
              <AiOutlineUser />
            </InputGroup.Text>
            <Form.Control
              placeholder="Your name"
              aria-label="Your name"
              aria-describedby="name"
              {...formik.getFieldProps("name")}
              isInvalid={formik.touched.name && formik.errors.name}
              //   isInvalid={!!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col md={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="email">
              <AiOutlineMail />
            </InputGroup.Text>
            <Form.Control
              placeholder="Your email"
              aria-label="Your email"
              aria-describedby="email"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && formik.errors.email}
              //   isInvalid={!!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col xs={12}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="subject">
              <BiTag />
            </InputGroup.Text>
            <Form.Control
              placeholder="Your subject"
              aria-label="Your subject"
              aria-describedby="subject"
              {...formik.getFieldProps("subject")}
              isInvalid={formik.touched.subject && formik.errors.subject}
              //   isInvalid={!!formik.errors.subject}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.subject}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col xs={12}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="message">
              <BiMessage />
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              placeholder="Your message"
              aria-label="Your message"
              aria-describedby="message"
              {...formik.getFieldProps("message")}
              isInvalid={formik.touched.message && formik.errors.message}
              //   isInvalid={!!formik.errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>

      <Button
        type="submit"
        disabled={!(formik.dirty && formik.isValid) || loading}
      >
        {loading && <ButtonSpinner />}
        Send <BiSend />
      </Button>
    </Form>
  );
};

export default ContactForm;

//id ile aria-describedby aynı olmalı

//form doldurulurken butonun arka arkaya basılmaması için loading set edilmelidir
//form doldurulurken butona basılmaması için disabled prop eklenmelidir.
