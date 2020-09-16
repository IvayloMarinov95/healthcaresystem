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
      <h6 className={styles.phone}>{phone}</h6>
    </div>
    <div className={styles.phoneContainer}>
      <FiMail className={styles.icon} />
      <h6 className={styles.phone}>{email}</h6>
    </div>
  </div>
);

export default DoctorContacts;
