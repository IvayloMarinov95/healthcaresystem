import React from "react";
import styles from "./ProvidedService.module.scss";

interface Props {
  icon: string | React.ReactNode;
  service: string;
  description: string;
}

const ProvidedService: React.FC<Props> = ({ icon, service, description }) => (
  <div className={styles.container}>
    <div className={styles.icon}>{icon}</div>
    <div>
      <h6 className={styles.service}>{service}</h6>
      <div className={styles.description}>{description}</div>
    </div>
  </div>
);

export default ProvidedService;
