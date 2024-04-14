import React from "react";
import { Carousel, Image } from "react-bootstrap";
import slides from "../../helpers/data/slider.json";
import "../home/slider.scss";
const Slider = () => {
  return (
    <div>
      <Carousel fade className="slider">
        {slides.map((slides) => (
          <Carousel.Item key={slides.id}>
            <Image
              src={`/images/slider/${slides.image}`}
              alt={`/images/slider/${slides.title}`}
              className="d-block w-100"
            />
            <Carousel.Caption className="text-dark">
              <h3 className="fs-1">{slides.title}</h3>
              <p className="fs-5">{slides.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
