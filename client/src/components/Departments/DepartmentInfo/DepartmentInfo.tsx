import React from "react";
import styles from "./DepartmentInfo.module.scss";

const DepartmentInfo: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.title}>
      <h3>Our Departments</h3>
    </div>
    <div className={styles.div}>Outpatient Surgery</div>
    <div className={styles.div}>Cardiac Clinic</div>
    <div className={styles.div}>Ophthalmology Clinic</div>
    <div className={styles.div}>Gynaecological Clinic</div>
    <div className={styles.div}>Pediatric Clinic</div>
    <div className={styles.div}>Laboratory Analysis</div>
  </div>
);

export default DepartmentInfo;
