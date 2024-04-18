import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

const Error404 = () => {
  return (
    <Container>
      <Row className="g-5">
        <Col>
          <Card className="text-center overflow-hidden">
            <Image src="../../../public/images/errors/404.svg" className="img-fluid"/>
            <Card.Body className="fw-bolder text-uppercase ">
              The page you are looking for was not found
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
