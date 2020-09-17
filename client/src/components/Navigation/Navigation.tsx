import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import Carousel from "./Carousel/Slider";
import { Link } from "react-router-dom";
import medicalClinic from "../../assets/medicalClinicLogo.png";
import styles from "./Navigation.module.scss";

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={scrolled ? styles.containerScroll : styles.container}>
        <Link to="/" className={styles.logoContainer}>
          <img src={medicalClinic} alt="" className={styles.medicalClinic} />
        </Link>
        <div>
          <Link to="/" className={styles.navTab}>
            Home
          </Link>
          <Link to="/" className={styles.navTab}>
            Departments
          </Link>
          <Link to="/" className={styles.navTab}>
            Doctors
          </Link>
          <Link to="/about" className={styles.navTab}>
            About
          </Link>
          <Button variant="dark">Sign in</Button>
        </div>
      </div>
      <Carousel />
    </>
  );
};

export default Navigation;
