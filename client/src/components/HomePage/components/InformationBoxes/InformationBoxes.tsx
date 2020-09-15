import InformationBox from "./InformationBox/InformationBox";
import OpeningHours from "./OpeningHours/OpeningHours";
import React from "react";
import styles from "./InformationBoxes.module.scss";

const InformationBoxes: React.FC = () => (
  <div className={styles.container}>
    <InformationBox
      style={styles.topDoctors}
      service="Top Doctors"
      description="Our medical facility provides the best professionals to help you with exceptional care"
    />
    <InformationBox
      style={styles.service}
      service="24 Hours Service"
      description="We are concerned about the health of our patients. This is why we provide 24 hours medical service. No matter the time you visit us we will not turn you back"
    />
    <InformationBox
      style={styles.openingHours}
      service="Opening Hours"
      description={<OpeningHours />}
    />
  </div>
);

export default InformationBoxes;
