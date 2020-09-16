import { BiWorld } from "react-icons/bi";
import { FaMobileAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import React from "react";
import { VscLocation } from "react-icons/vsc";
import styles from "./FooterInfo.module.scss";

const FooterInfo: React.FC = () => (
  <div className={styles.container}>
    <span className={styles.header}>Contact Information</span>
    <div className={styles.sectionContainer}>
      <div className={styles.section}>
        <VscLocation className={styles.icon} size={25} />
        <span>227 Marion street New York USA</span>
      </div>
      <div className={styles.section}>
        <BiWorld className={styles.icon} size={25} />
        <span>www.localhost:3000/</span>
      </div>
      <div className={styles.section}>
        <FaMobileAlt className={styles.icon} size={25} />
        <span>227 Marion street New York USA</span>
      </div>
      <div className={styles.section}>
        <FiMail className={styles.icon} size={25} />
        <span>227 Marion street New York USA</span>
      </div>
    </div>
  </div>
);

export default FooterInfo;
