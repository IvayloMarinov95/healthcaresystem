import React from "react";
import styles from "./Information.module.scss";

const Information: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.title}>Medical excellency every day</div>
    <div className={styles.text}>Entrust your health to our professionals</div>
  </div>
);

export default Information;
