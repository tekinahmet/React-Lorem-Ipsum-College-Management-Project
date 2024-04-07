import React from "react";
import events from "../../helpers/data/events.json";
import { Container } from "react-bootstrap";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import "./upcoming-events.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import EventCard from "../events/event-card";

const upcomingEvents = events.filter(
  (event) => new Date() < new Date(event.date)
);

const UpcomingEvents = () => {
  return (
    <div className="upcoming-events">
      <Container>
        <h2>
          <div className="prev">
            <FaChevronCircleLeft />
          </div>
          <div>Upcoming Events </div>
          <div className="next">
            <FaChevronCircleRight />
          </div>
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
        >
          {upcomingEvents.map((event) => (
            <SwiperSlide>
              <EventCard {...event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default UpcomingEvents;
