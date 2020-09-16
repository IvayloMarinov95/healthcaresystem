import FooterInfo from "./FooterInfo/FooterInfo";
import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.infoContainer}>
      <FooterInfo />
    </div>
    <div className={styles.infoContainer}>
      <FooterInfo />
    </div>
    <div className={styles.infoContainer}>
      <FooterInfo />
    </div>
  </div>
);

export default Footer;
