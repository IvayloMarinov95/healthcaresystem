import React from "react";
import styles from "./Contact.module.scss";

interface Props {
  icon: React.ReactNode;
  text: string;
  provider?: string;
}
const Contact: React.FC<Props> = ({ icon, text, provider }) => (
  <div className={styles.container}>
    <div className={styles.icon}>{icon}</div>
    <div>
      <span className={styles.text}>{text}</span>
      <div className={styles.provider}>{provider}</div>
    </div>
  </div>
);

export default Contact;
