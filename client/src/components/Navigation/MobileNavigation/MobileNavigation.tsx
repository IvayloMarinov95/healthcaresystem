import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import medicalClinic from "../../../assets/medicalClinicLogo.png";
import styles from "../Navigation.module.scss";
import Hamburger from "hamburger-react";
import { Button } from "react-bootstrap";
import AuthenticationModal from "../AuthenticationModal/AuthenticationModal";

const MobileNavigation = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [toggle, setToggle] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
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
    <div ref={ref}>
      <div className={styles.containerScroll}>
        <Link to="/" className={styles.logoContainer}>
          <img src={medicalClinic} alt="" className={styles.medicalClinic} />
        </Link>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          direction="right"
          color="white"
        />
      </div>
      {isOpen && (
        <div className={styles.mobileTabsContainer}>
          <Link to="/" className={styles.mobileTabs}>
            Home
          </Link>
          <Link to="/departments" className={styles.mobileTabs}>
            Departments
          </Link>
          <Link to="/doctors" className={styles.mobileTabs}>
            Doctors
          </Link>
          <Link to="/about" className={styles.mobileTabs}>
            About
          </Link>
          <Button
            variant="secondary"
            className={styles.mobileBtn}
            onClick={() => handleClick("signIn")}
          >
            Sign In
          </Button>
          <Button
            variant="dark"
            className={styles.mobileBtn}
            onClick={() => handleClick("signUp")}
          >
            Sign Up
          </Button>
        </div>
      )}
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
    </div>
  );
};

export default MobileNavigation;
