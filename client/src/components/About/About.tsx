import { Carousel, CarouselItem } from "react-bootstrap";
import React, { useEffect } from "react";

import AccordionMenu from "./AccordionMenu/AccordionMenu";
import Title from "../Title/Title";
import pic1 from "../../assets/pic1.jpg";
import pic2 from "../../assets/pic2.jpg";
import pic3 from "../../assets/pic3.jpg";
import styles from "./About.module.scss";

interface CarouselObjects {
  [text: string]: string;
}

const carouselItems: CarouselObjects[] = [
  {
    img: pic1,
  },
  {
    img: pic2,
  },
  {
    img: pic3,
  },
];

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={styles.container}>
      <Title tinyHeader="Professionals" header="Welcome to Medical Clinic" />
      <div className={styles.content}>
        <div className={styles.carousel}>
          <Carousel slide={true} interval={3000} indicators={false}>
            {carouselItems.map(({ img }, index) => (
              <CarouselItem className={styles.carousel} key={index}>
                <img className="d-block w-100" src={img} alt="" />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
        <div className={styles.accordion}>
          <AccordionMenu />
        </div>
      </div>
    </div>
  );
};

export default About;
