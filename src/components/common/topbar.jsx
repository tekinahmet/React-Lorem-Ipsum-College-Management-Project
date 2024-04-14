import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { config } from "../../helpers/config";
import "./topbar.scss";
import UserMenu from "./user-menu";

const TopBar = () => {
  return (
    <div className="topbar">
      <Container>
        <Row>
          <Col md={10} className="d-none d-md-block">
            {config.project.slogan}
          </Col>
          <Col md={2} className="text-center text-md-end">
            <UserMenu />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
