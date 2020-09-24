import DoctorContacts from "./Contacts/DoctorContacts";
import KitchenSink from "../Cards/KitchenSink/KitchenSink";
import React from "react";
import Title from "../../../Title/Title";
import amy from "../../../../assets/amy.jpg";
import julia from "../../../../assets/julia.jpg";
import max from "../../../../assets/max.jpg";
import michael from "../../../../assets/michael.jpg";
import styles from "./OurProfessionals.module.scss";

const OurProfessionals: React.FC = () => (
  <div className={styles.container}>
    <Title tinyHeader="Professionals" header="Some of our doctors" />
    <div className={styles.cards}>
      <div className={styles.column}>
        <KitchenSink
          image={julia}
          title="Dr. Julia Jameson"
          text="Pediatrist"
          item1="The branch of medicine concerned with the development, care, and diseases of babies and children."
          item2={
            <DoctorContacts
              phone="+1-212-555-7575"
              email="example@example.com"
            />
          }
        />
        <KitchenSink
          image={max}
          title="Dr. Max Turner"
          text="Cardiologist"
          item1="Cardiology deals with the disorders of the heart as well as some parts of the circulatory system"
          item2={
            <DoctorContacts
              phone="+1-212-555-7575"
              email="example@example.com"
            />
          }
        />
      </div>
      <div className={styles.column}>
        <KitchenSink
          image={amy}
          title="Dr. Amy Adams"
          text="Rehabilitation Therapy"
          item1="Rehabilitation treatment services intended to restore your body to their highest degree of performance. "
          item2={
            <DoctorContacts
              phone="+1-212-555-7575"
              email="example@example.com"
            />
          }
        />
        <KitchenSink
          image={michael}
          title="Dr. Michael Linden"
          text="Pediatrist"
          item1="The branch of medicine concerned with the development, care, and diseases of babies and children."
          item2={
            <DoctorContacts
              phone="+1-212-555-7575"
              email="example@example.com"
            />
          }
        />
      </div>
    </div>
  </div>
);

export default OurProfessionals;
