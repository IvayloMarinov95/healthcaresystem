import ContactInfo from "./ContactInfo/ContactInfo";
import Info from "./Info/Info";
import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.infoContainer}>
      <ContactInfo />
      <Info
        header="Doctors"
        item1="Dr. Julia Jameson"
        item2="Dr. Max Turner"
        item3="Dr. Amy Adams"
        item4="Dr. Michael Linden"
      />
      <Info
        header="Services"
        item1="Pediatrist"
        item2="Cardiologist"
        item3="Rehabilitation Therapy"
        item4="Pediatrist"
      />
    </div>
  </div>
);

export default Footer;
