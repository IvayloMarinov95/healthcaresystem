import DoctorContacts from "../../HomePage/components/OurProfessionals/Contacts/DoctorContacts";
import React from "react";
import chief from "../../../assets/chief.jpg";
import styles from "./Chief.module.scss";

const Chief: React.FC = () => (
  <div className={styles.chief}>
    <div className={styles.content}>
      <img src={chief} alt="" className={styles.img} />
      <div className={styles.contactsContainer}>
        <div className={styles.contacts}>
          <div className={styles.profession}>
            <div>Dr. Nick Sims</div>
            <div>Gynecologist</div>
          </div>
          <DoctorContacts phone="+1-212-555-7575" email="example@example.com" />
        </div>
        <div className={styles.description}>
          Etiam eu molestie eros, commodo hendrerit sapien. Maecenas tempus leo
          ac nisi iaculis porta. Sed sapien tortor, aliquet a velit ut, lacinia
          molestie velit. Maecenas ornare consequat massa ullamcorper dapibus.
          Etiam eu molestie eros, commodo hendrerit sapien. Maecenas tempus leo
          ac nisi iaculis porta. Sed sapien tortor, aliquet a velit ut, lacinia
          molestie velit. Maecenas ornare consequat massa ullamcorper dapibus.
        </div>
      </div>
    </div>
  </div>
);

export default Chief;
