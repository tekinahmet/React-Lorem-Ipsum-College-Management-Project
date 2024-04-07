import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "../../helpers/config";
import {FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaGithub} from "react-icons/fa"

const SocialMenu = (props) => {
  return (
    <Nav {...props}>
      <Nav.Link href={config.contact.socialMedia.linkedin} target="_blank">
        <FaLinkedinIn /> Linkedin
      </Nav.Link>
      <Nav.Link href={config.contact.socialMedia.twitter} target="_blank">
        <FaTwitter /> Twitter
      </Nav.Link>
      <Nav.Link href={config.contact.socialMedia.facebook} target="_blank">
        <FaFacebook /> Facebook
      </Nav.Link>
      <Nav.Link href={config.contact.socialMedia.instagram} target="_blank">
        <FaInstagram /> Instagram
      </Nav.Link>
      <Nav.Link href={config.contact.socialMedia.youtube} target="_blank">
        <FaYoutube /> Youtube
      </Nav.Link>
      <Nav.Link href={config.contact.socialMedia.github} target="_blank">
        <FaGithub /> Github
      </Nav.Link>
    </Nav>
  );
};

export default SocialMenu;
