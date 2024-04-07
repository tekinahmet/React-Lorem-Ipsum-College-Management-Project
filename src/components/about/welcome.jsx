import React from 'react'
import "./welcome.scss"
import { Col, Container, Image, Row } from 'react-bootstrap'
const Welcome = () => {
  return (
    <div className="welcome">
      <Container>
        <Row className='g-5 align-items-center '>
          <Col md={6}>
            <Image src="/images/about/welcome.jpg" className="img-fluid rounded-1" />
          </Col>
          <Col md={6}>
            <h2>Welcome to Lorem Ipsum School</h2>
            <p>
              Our school's mission is to learn leadership, the common core, and
              relationships for life.
            </p>
            <ul>
              <li>
                We feel strongly about helping to build leaders that have the
                ability to succeed in whatever endeavor they undertake.{" "}
              </li>
              <li>
                Our students understand the "Win, win" philosophy and use it in
                their daily life.
              </li>
              <li>
                Common standards keeps us focused on learning appropriate
                content and preparing our students to graduate.
              </li>
              <li>
                Last but just as importantly, setting examples for our students
                of meaningful and lasting relationships will go with them
                throughout their lifetime.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Welcome