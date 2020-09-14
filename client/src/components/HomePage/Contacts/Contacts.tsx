import Contact from "./Contact/Contact";
import { FaMobileAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import React from "react";
import styles from "./Contacts.module.scss";

const Contacts: React.FC = () => (
  <div className={styles.container}>
    <Contact
      icon={<FaMobileAlt size={60} />}
      text="Give us a Call"
      provider="1-888-123-4567"
    />
    <Contact
      icon={<FiMail size={60} />}
      text="Send us a Message"
      provider="test@test.com"
    />
    <Contact
      icon={<GoLocation size={60} />}
      text="Visit our Location"
      provider="3213 Suitland Street"
    />
  </div>
);

export default Contacts;
