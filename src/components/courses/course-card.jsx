import React from "react";
import { Card } from "react-bootstrap";
import { FiUser, FiTrendingUp, FiDollarSign } from "react-icons/fi";
import "./course-card.scss";

const CourseCard = ({ image, title, user, rating, price }) => {
  return (
    <Card className="course-card">
      <Card.Body>
        <div className="card-img">
          <Card.Img
            src={`/images/courses/${image}`}
            alt={title}
            style={{ height: 225, objectFit: "cover" }}
          />
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>
          <div>
            <FiUser />
            {user}
          </div>
          <div>
            <FiTrendingUp />
            {rating}
          </div>
          <div>
            <FiDollarSign />
            {price}
          </div>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
