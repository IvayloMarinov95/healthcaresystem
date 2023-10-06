import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './Medicine.module.scss';

type Props = {
  key: string;
};

const Medicine: React.FC<Props> = ({ key }) => {
  return (
    <div key={key} className={styles.medicineContainer}>
      <Form.Group controlId="medicineName" className={styles.medicineName}>
        <Form.Label>Medicine Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter medicine name"
          //   value={medicineName}
          //   onChange={handleMedicineNameChange}
        />
      </Form.Group>
      <div className={styles.sections}>
        <Form.Group controlId="quantity" className={styles.leftSide}>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter quantity"
            // value={quantity}
            // onChange={handleQuantityChange}
          />
        </Form.Group>
        <Form.Group
          controlId="consumptionFrequency"
          className={styles.rightSide}
        >
          <Form.Label>Consumption frequency</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter consumption frequency"
            // value={consumptionFrequency}
            // onChange={handleConsumptionFrequencyChange}
          />
        </Form.Group>
      </div>
      <div className={styles.sections}>
        <Form.Group
          controlId="formOfPrescriptionDose"
          className={styles.leftSide}
        >
          <Form.Label>Prescription Dose</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter form of prescription dose"
            // value={formOfPrescriptionDose}
            // onChange={handleFormOfPrescriptionDoseChange}
          />
        </Form.Group>
        <Form.Group controlId="period" className={styles.rightSide}>
          <Form.Label>Period</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter period"
            // value={period}
            // onChange={handlePeriodChange}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default Medicine;
