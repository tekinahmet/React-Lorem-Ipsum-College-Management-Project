import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "../../helpers/config";
import {
  FaPhone,
  FaAddressBook,
  FaEnvelopeOpen

} from "react-icons/fa";

const ContactMenu = (props) => {
  return (
    <Nav {...props}>
      <Nav.Link href={`tel: ${config.contact.phone1}`}>
        <FaPhone /> {config.contact.phone1}
      </Nav.Link>
      <Nav.Link href={`tel: ${config.contact.phone2}`}>
        <FaPhone /> {config.contact.phone2}
      </Nav.Link>
      <Nav.Link href={`mailto: ${config.contact.email}`}>
        <FaEnvelopeOpen /> {config.contact.email}
      </Nav.Link>
      <Nav.Link href={config.contact.mapUrl} target="_blank">
        <FaAddressBook /> {config.contact.address}
      </Nav.Link>
    </Nav>
  );
};

export default ContactMenu;
