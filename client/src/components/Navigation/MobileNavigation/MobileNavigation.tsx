import React, { useState } from "react";
import { Link } from "react-router-dom";
import medicalClinic from "../../../assets/medicalClinicLogo.png";
import styles from "../Navigation.module.scss";
import Hamburger from "hamburger-react";
import { Button } from "react-bootstrap";

const MobileNavigation = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
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
          <Button variant="dark" size="lg">
            Sign in
          </Button>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
