import React from "react";
import medicalClinic from "../../assets/medicalClinicLogo.png";
import styles from "./Navigation.module.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.logos}>
      <img src={medicalClinic} alt="" className={styles.medicalClinic} />
    </div>
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
      <Link to="/" className={styles.navTab}>
        About
      </Link>
      <Button variant="outline-dark">Sign in</Button>
    </div>
  </div>
);

export default Navigation;
