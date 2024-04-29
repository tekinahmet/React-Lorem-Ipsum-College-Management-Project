import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./dashboard-navigation.scss"

const DashboardNavigation = () => {
  //merkezi state e ulasip userMenu objesini alir
  const { userMenu } = useSelector((state) => state.auth);
  console.log(userMenu);
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3 justify-content-center">
        {userMenu.map((item) => (
          <Col key={item.title}>
            <Button as={Link} to={item.link} className="dashboard-nav-btn w-100 h-100">
                {item.title}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DashboardNavigation;
//row default flex