import React from "react";

import cardiac from "../../assets/cardiacclinic.jpg";
import gynecology from "../../assets/gynecology.jpg";
import lab from "../../assets/lab.jpg";
import opthal from "../../assets/opthal.jpg";
import surgery from "../../assets/outpatientsurgery.jpg";
import pediatric from "../../assets/pediatricclinic.jpg";
import InformationBox from "../HomePage/components/InformationBoxes/InformationBox/InformationBox";
import OpeningHours from "../HomePage/components/InformationBoxes/OpeningHours/OpeningHours";
import Department from "./Department/Department";
import DepartmentInfo from "./DepartmentInfo/DepartmentInfo";
import styles from "./Departments.module.scss";

const Departments: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <DepartmentInfo />
        <InformationBox
          style={styles.openingHours}
          service='Opening Hours'
          description={<OpeningHours />}
        />
      </div>
      <div className={styles.departments}>
        <Department
          image={surgery}
          header='Outpatient Surgery'
          text='In Services, Therapy'
        />
        <Department image={cardiac} header='Cardiac Clinic' text='In Surgery' />
        <Department
          image={opthal}
          header='Ophthalmology Clinic'
          text='In Therapy'
        />
        <Department
          image={gynecology}
          header='Gynaecological Clinic'
          text='In Therapy'
        />
        <Department
          image={pediatric}
          header='Pediatric Clinic'
          text='In Pediatric'
        />
        <Department
          image={lab}
          header='Laboratory Analysis'
          text='In Pharmacy'
        />
      </div>
    </div>
  );
};

export default Departments;
