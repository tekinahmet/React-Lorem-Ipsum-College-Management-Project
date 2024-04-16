import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

const Error404 = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="text-center overflow-hidden">
            <Image src="../../../public/images/errors/404.svg" />
            <Card.Body className="fw-bolder text-uppercase ">
              Page Not Found
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
