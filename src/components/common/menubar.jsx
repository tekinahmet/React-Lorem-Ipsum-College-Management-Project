import React from "react";
import { Image, Navbar } from "react-bootstrap";
import { Container, Offcanvas } from "react-bootstrap";
import { config } from "../../helpers/config";
import { Link } from "react-router-dom";
import MainMenu from "./main-menu";

const MenuBar = () => {
  return (
    <Navbar expand="lg" sticky="top" className="bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image
            src="logo.jpg"
            style={{ width: 100, borderRadius: "50%" }}
            alt={config.project.name}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="mainMenu" />
        <Navbar.Offcanvas
          id="mainMenu"
          aria-labelledby="offcanvas"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvas">
              <Image
                src="logo.jpg"
                style={{ width: 100, borderRadius: "50%" }}
                alt={config.project.name}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <MainMenu className="justify-content-center flex-grow-1 pe-3" />
            <a
              href={`tel: ${config.contact.phone1}`}
              className="btn btn-outline-primary"
            >
              CALL NOW
            </a>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MenuBar;
