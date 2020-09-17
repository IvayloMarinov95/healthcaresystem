import React from "react";
import styles from "./Info.module.scss";

interface Props {
  header: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
}

const Info: React.FC<Props> = ({ header, item1, item2, item3, item4 }) => (
  <div className={styles.container}>
    <span className={styles.header}>{header}</span>
    <div className={styles.sectionContainer}>
      <div className={styles.section}>{item1}</div>
      <div className={styles.section}>{item2}</div>
      <div className={styles.section}>{item3}</div>
      <div className={styles.section}>{item4}</div>
    </div>
  </div>
);

export default Info;
