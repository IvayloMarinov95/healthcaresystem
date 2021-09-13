import React from "react";
import styles from "./OpeningHours.module.scss";

const OpeningHours: React.FC = () => (
  <>
    <div className={styles.section}>
      <span>Monday-Friday</span>
      <span>7.00-19.00</span>
    </div>
    <div className={styles.section}>
      <span>Saturday</span>
      <span>8.30-17.00</span>
    </div>
    <div className={styles.section}>
      <span>Sunday</span>
      <span>9.00-15.00</span>
    </div>
  </>
);

export default OpeningHours;
