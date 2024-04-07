import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import courses from "../../helpers/data/courses.json";
import "./featured-courses.scss";
import CourseCard from "../courses/course-card";

const featuredCourses = courses.filter((course) => course.featured);

const FeaturedCourses = () => {
  return (
    <div className="featured-courses">
      <h2>Featured Courses</h2>
      <Container>
        <Row className="g-5" xs={1} sm={2} md={3} lg={4}>
          {featuredCourses.map((course) => (
            <Col>
              <CourseCard {...course} key={course.id} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FeaturedCourses;
