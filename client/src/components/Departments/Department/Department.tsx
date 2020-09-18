import React from "react";
import styles from "./Department.module.scss";

interface Props {
  image: string;
  header: string;
  text: string;
}

const Department: React.FC<Props> = ({ image, header, text }) => (
  <div className={styles.container}>
    <img src={image} alt="" className={styles.img} />
    <div className={styles.text}>
      <span className={styles.header}>{header}</span>
      <div>{text}</div>
    </div>
  </div>
);

export default Department;
