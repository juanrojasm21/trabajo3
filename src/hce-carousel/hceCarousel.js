import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './hceCarousel.css';

function HceCarousel({ img, className }) {
  return (
    <Carousel className={className}>

      {img.map(image => (
        <Carousel.Item key={image.id}>
          <img
            className="d-block w-100 carousel-image"
            src={image.image}
            alt={image.title}
          />
          <Carousel.Caption className="carousel-caption">
            <h3>{image.title}</h3>
            <p>{image.subtitle}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}

    </Carousel>
  );
}

export default HceCarousel; 