import React, { useState } from "react";
import KitchenSink from "../HomePage/components/Cards/KitchenSink/KitchenSink";
import Search from "../Search/Search";
import amy from "../../assets/amy.jpg";
import julia from "../../assets/julia.jpg";
import max from "../../assets/max.jpg";
import michael from "../../assets/michael.jpg";
import styles from "./Patients.module.scss";

const Patients: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event?.target.value);

  return (
    <>
      <div className={styles.container}>
        <Search input={input} handleChange={handleChange} />
        <div className={styles.patients}>
          <div className={styles.cards}>
            <KitchenSink
              handleClick={() => console.log("opa 6")}
              image={julia}
              title='Dr. Julia Jameson'
              text='Pediatrist'
              item1='The branch of medicine concerned with the development, care, and diseases of babies and children.'
              item2='Age: '
            />
            <KitchenSink
              image={max}
              title='Dr. Max Turner'
              text='Cardiologist'
              item1='Cardiology deals with the disorders of the heart as well as some parts of the circulatory system'
              item2='Age: '
            />
            <KitchenSink
              image={amy}
              title='Dr. Amy Adams'
              text='Rehabilitation Therapy'
              item1='Rehabilitation treatment services intended to restore your body to their highest degree of performance. '
              item2='Age: '
            />
            <KitchenSink
              image={michael}
              title='Dr. Michael Linden'
              text='Pediatrist'
              item1='The branch of medicine concerned with the development, care, and diseases of babies and children.'
              item2='Age: '
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Patients;
