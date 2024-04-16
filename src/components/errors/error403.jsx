import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

const Error403 = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="text-center overflow-hidden">
            <Image src="../../../public/images/errors/403.svg" />
            <Card.Body className="fw-bolder text-uppercase ">
              Access Denied
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Error403;
