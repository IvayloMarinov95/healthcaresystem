import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button } from "react-bootstrap";
import Carousel from "./Carousel/Slider";
import { Link } from "react-router-dom";
import medicalClinic from "../../assets/medicalClinicLogo.png";
import styles from "./Navigation.module.scss";
import classNames from "classnames";

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [resized, setResize] = useState<boolean>(false);
  const location = useLocation();

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

  useEffect(() => {
    const handleMobile = () => {
      if (window.innerWidth < 769) {
        setResize(true);
      } else {
        setResize(false);
      }
    };
    window.addEventListener("resize", handleMobile);
    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, []);

  return (
    <>
      <div
        className={
          scrolled || resized ? styles.containerScroll : styles.container
        }
      >
        <Link to="/" className={styles.logoContainer}>
          <img src={medicalClinic} alt="" className={styles.medicalClinic} />
        </Link>
        <div>
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? classNames(styles.navTab, styles.active)
                : styles.navTab
            }
          >
            Home
          </Link>
          <Link
            to="/departments"
            className={
              location.pathname === "/departments"
                ? classNames(styles.navTab, styles.active)
                : styles.navTab
            }
          >
            Departments
          </Link>
          <Link
            to="/doctors"
            className={
              location.pathname === "/doctors"
                ? classNames(styles.navTab, styles.active)
                : styles.navTab
            }
          >
            Doctors
          </Link>
          <Link
            to="/about"
            className={
              location.pathname === "/about"
                ? classNames(styles.navTab, styles.active)
                : styles.navTab
            }
          >
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
