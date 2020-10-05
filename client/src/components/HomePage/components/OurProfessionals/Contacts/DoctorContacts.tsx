import { FaMobileAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import React from "react";
import styles from "./DoctorContacts.module.scss";

interface Props {
  phone: string;
  email: string;
}

const DoctorContacts: React.FC<Props> = ({ phone, email }) => (
  <div>
    <div className={styles.phoneContainer}>
      <FaMobileAlt className={styles.icon} />
      <span className={styles.phone}>{phone}</span>
    </div>
    <div className={styles.phoneContainer}>
      <FiMail className={styles.icon} />
      <span className={styles.phone}>{email}</span>
    </div>
  </div>
);

export default DoctorContacts;
