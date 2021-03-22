import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, ButtonGroup } from "react-bootstrap";
import Carousel from "../Carousel/Slider";
import { Link } from "react-router-dom";
import medicalClinic from "../../../assets/medicalClinicLogo.png";
import styles from "../Navigation.module.scss";
import classNames from "classnames";
import AuthenticationModal from "../AuthenticationModal/AuthenticationModal";

const DesktopNavigation: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [resized, setResize] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [toggle, setToggle] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = (toggle: string) => {
    setOpenModal(true);
    setToggle(toggle);
  };

  const handleModalContentChange = (toggle: string) => {
    setEmail("");
    setPassword("");
    setUsername("");
    setToggle(toggle);
  };

  const handleHide = () => {
    setOpenModal(false);
  };

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
          <ButtonGroup>
            <Button variant="secondary" onClick={() => handleClick("signIn")}>
              Sign In
            </Button>
            <Button variant="dark" onClick={() => handleClick("signUp")}>
              Sign Up
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Carousel />
      <AuthenticationModal
        openModal={openModal}
        handleHide={handleHide}
        toggle={toggle}
        username={username}
        email={email}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleModalContentChange={handleModalContentChange}
      />
    </>
  );
};

export default DesktopNavigation;
