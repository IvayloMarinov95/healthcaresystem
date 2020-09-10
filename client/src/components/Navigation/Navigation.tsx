import React from "react";
import logo from "../../assets/logo.png";
import medicalClinic from "../../assets/medicalClinicLogo.png";
import styles from "./Navigation.module.scss";
import { Button } from "@material-ui/core";

const Navigation: React.FC = () => (
  <div className={styles.container}>
    <div>
      <img src={logo} alt="" className={styles.logo} />
      <img src={medicalClinic} alt="" className={styles.medicalClinic} />
    </div>
    <div>
      <span className={styles.navTab}>Departments</span>
      <span className={styles.navTab}>Doctors</span>
      <span className={styles.navTab}>About</span>
      <Button variant="contained" color="primary">
        Sign in
      </Button>
    </div>
  </div>
);

export default Navigation;
