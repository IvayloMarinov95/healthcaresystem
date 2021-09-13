import { FaHeartbeat, FaStethoscope } from "react-icons/fa";

import { GiMedicines } from "react-icons/gi";
import { IoMdMedical } from "react-icons/io";
import ProvidedService from "./ProvidedService/ProvidedService";
import React from "react";
import styles from "./ProvidedServices.module.scss";

const ProvidedServices: React.FC = () => (
  <div className={styles.container}>
    <ProvidedService
      icon={<GiMedicines size={50} />}
      service="Medical Treatment"
      description="Medical treatment means the management and care of a patient to combat disease or disorder."
    />
    <ProvidedService
      icon={<IoMdMedical size={50} />}
      service="Emergency Help"
      description="A medical emergency is an acute injury or illness that poses an immediate risk to a person's life or long-term health, sometimes referred to as a situation risking life or limb "
    />
    <ProvidedService
      icon={<FaHeartbeat size={50} />}
      service="Medical professionals"
      description="Medical professional means any person licensed or certified to provide health care services to natural persons."
    />
    <ProvidedService
      icon={<FaStethoscope size={50} />}
      service="Qualified Doctors"
      description="Someone who is qualified has passed the examinations that they need to pass in order to work in a particular profession."
    />
  </div>
);

export default ProvidedServices;
