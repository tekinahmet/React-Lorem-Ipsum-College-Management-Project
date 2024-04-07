import React from "react";
import { Col, Image } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "../../helpers/config";
import MainMenu from "./main-menu";
import "./footer.scss";
import SocialMenu from "./social-menu";
import ContactMenu from "./contact-menu";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="g-5 ">
          <Col lg={3} >
            <div style={{ textAlign: "center" }}><Link to="/">
              <Image
                src="logo.jpg"
                style={{ width: 100, borderRadius: "50%", marginBottom: 10}}
                alt={config.project.name}
              />
            </Link></div>
            <p style={{ textAlign: "justify"}}>{config.project.description}</p>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <h3>Quick Links</h3>
            <MainMenu className="flex-column" />
          </Col>
          <Col sm={6} md={4} lg={3}>
            <h3>Social Links</h3>
            <SocialMenu className="flex-column" />
          </Col>
          <Col md={4} lg={3}>
            <h3>Contact Us</h3>
            <ContactMenu />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
