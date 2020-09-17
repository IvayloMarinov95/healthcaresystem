import { Carousel, CarouselItem } from "react-bootstrap";

import React from "react";
import img1 from "../../../assets/bg-4.jpg";
import img2 from "../../../assets/bg-3-1.jpg";
import img3 from "../../../assets/bg-2-1-1.jpg";
import styles from "./Slider.module.scss";

interface CarouselObjects {
  [text: string]: string;
}

const carouselItems: CarouselObjects[] = [
  {
    img: img1,
    text: "Medical excellency every day",
  },
  {
    img: img2,
    text: "Exceptional People. Exceptional care.",
  },
  {
    img: img3,
    text: "Medical services that you can trust",
  },
];

const Slider: React.FC = () => (
  <div className={styles.container}>
    <Carousel slide={true} controls={false} interval={3000}>
      {carouselItems.map(({ img, text }, index) => (
        <CarouselItem className={styles.carousel} key={index}>
          <img className="d-block w-100" src={img} alt="" />
          <Carousel.Caption className={styles.caption}>
            <h5>Entrust your health to our professionals</h5>
            <h1>{text}</h1>
          </Carousel.Caption>
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

export default Slider;
