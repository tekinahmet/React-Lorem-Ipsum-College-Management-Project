import React from "react";
import "./instructor-card.scss";
import { Card } from "react-bootstrap";

const InstructorCard = ({ firstName, lastName, title, image }) => {
  return (
    <Card className="instructor-card">
      <Card.Img
        src={`/images/instructors/${image}`}
        alt={firstName + " " + lastName}
        style={{ height: 250, width: "100%" }}
      />

      <Card.Title>
        <h4>
          {firstName} {lastName}
        </h4>
        <h6>{title}</h6>
      </Card.Title>
    </Card>
  );
};

export default InstructorCard;
