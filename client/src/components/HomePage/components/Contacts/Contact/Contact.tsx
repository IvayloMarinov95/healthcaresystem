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
      <h6 className={styles.text}>{text}</h6>
      <div className={styles.provider}>{provider}</div>
    </div>
  </div>
);

export default Contact;
