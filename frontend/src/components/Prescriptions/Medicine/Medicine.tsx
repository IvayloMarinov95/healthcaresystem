import React from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './Medicine.module.scss';
import { FaMinus } from 'react-icons/fa';

interface Medicine {
  medicineName: string;
  quantity: string;
  consumptionFrequency: string;
  prescriptionDose: string;
  period: string;
}

type Props = {
  index: number;
  medicine: Medicine;
  handleChange: (index: number, fieldName: string, value: string) => void;
  handleRemoveElement: (index: number) => void;
};

const Medicine: React.FC<Props> = ({
  index,
  medicine,
  handleChange,
  handleRemoveElement,
}) => {
  const handleMedicineNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(index, 'medicineName', e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(index, 'quantity', e.target.value);
  };

  const handleConsumptionFrequencyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChange(index, 'consumptionFrequency', e.target.value);
  };

  const handlePrescriptionDoseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChange(index, 'prescriptionDose', e.target.value);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(index, 'period', e.target.value);
  };

  const renderTooltip = (props: object) => (
    <Tooltip id="button-tooltip" {...props}>
      Remove medicine
    </Tooltip>
  );

  const removeMedicine = () => {
    handleRemoveElement(index);
  };

  return (
    <div key={index}>
      {index !== 0 && (
        <div className={styles.addSectionDiv}>
          <OverlayTrigger placement="right" overlay={renderTooltip}>
            <Button
              variant="danger"
              className={styles.addBtn}
              onClick={removeMedicine}
            >
              <FaMinus />
            </Button>
          </OverlayTrigger>
        </div>
      )}
      <div className={styles.medicineContainer}>
        <Form.Group controlId="medicineName" className={styles.medicineName}>
          <Form.Label>Medicine Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter medicine name"
            value={medicine.medicineName}
            onChange={handleMedicineNameChange}
          />
        </Form.Group>
        <div className={styles.sections}>
          <Form.Group controlId="quantity" className={styles.leftSide}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quantity"
              value={medicine.quantity}
              onChange={handleQuantityChange}
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
              value={medicine.consumptionFrequency}
              onChange={handleConsumptionFrequencyChange}
            />
          </Form.Group>
        </div>
        <div className={styles.sections}>
          <Form.Group controlId="prescriptionDose" className={styles.leftSide}>
            <Form.Label>Prescription Dose</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter prescription dose"
              value={medicine.prescriptionDose}
              onChange={handlePrescriptionDoseChange}
            />
          </Form.Group>
          <Form.Group controlId="period" className={styles.rightSide}>
            <Form.Label>Period</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter period"
              value={medicine.period}
              onChange={handlePeriodChange}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
