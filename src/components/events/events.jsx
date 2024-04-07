import React from 'react'
import EventCard from './event-card';
import { Col, Container, Row } from 'react-bootstrap';
import events from '../../helpers/data/events.json';

const Events = () => {
  return (
    <Container>
      <Row className="g-5" xs={1} sm={2} md={3} lg={4}>
        {events.map((event) => (
          <Col key={event.id}>
            <EventCard {...event} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Events