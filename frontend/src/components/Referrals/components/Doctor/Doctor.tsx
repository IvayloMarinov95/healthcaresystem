import React from 'react';
import SquareInputs from '../SquareInputs/SquareInputs';
import styles from './Doctor.module.scss';
import { Form } from 'react-bootstrap';

type Props = {
  medicalPlaceRegNumber: string;
  handleMedicalPlaceRegisterNumberChange: (fieldValue: string) => void;
  doctorSpecialtyCode: string;
  handleDoctorSpecialtyCodeChange: (fieldValue: string) => void;
  doctorName: string;
  handleDoctorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  doctorSectionPersonalId: string;
  handleDoctorSectionPersonalIdChange: (fieldValue: string) => void;
};

const Doctor: React.FC<Props> = ({
  medicalPlaceRegNumber,
  handleMedicalPlaceRegisterNumberChange,
  doctorSpecialtyCode,
  handleDoctorSpecialtyCodeChange,
  doctorName,
  handleDoctorNameChange,
  doctorSectionPersonalId,
  handleDoctorSectionPersonalIdChange,
}) => (
  <div className={styles.container}>
    <div className={styles.doctor}>
      <div className={styles.doctorText}>DOCTOR</div>
      <div>
        <SquareInputs
          numberOfInputs={10}
          fieldValue={medicalPlaceRegNumber}
          containerClass={styles.longSquares}
          characterClass={styles.characters}
          handleChange={handleMedicalPlaceRegisterNumberChange}
        />
        <label>Reg. number of the medical place</label>
      </div>
    </div>
    <div className={styles.doctor}>
      <div>
        <SquareInputs
          numberOfInputs={2}
          fieldValue={doctorSpecialtyCode}
          containerClass={styles.specialtyCode}
          characterClass={styles.characters}
          handleChange={handleDoctorSpecialtyCodeChange}
        />
        <label>Specialty Code</label>
      </div>
      <div>
        <SquareInputs
          numberOfInputs={10}
          fieldValue={doctorSectionPersonalId}
          containerClass={styles.longSquares}
          characterClass={styles.characters}
          handleChange={handleDoctorSectionPersonalIdChange}
        />
        <label>Personal ID of the doctor</label>
      </div>
    </div>
    <div className={styles.personName}>
      <Form.Group controlId="doctorName">
        <Form.Label>Firstname and lastname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter firstname and lastname"
          value={doctorName}
          onChange={handleDoctorNameChange}
        />
      </Form.Group>
    </div>
  </div>
);

export default Doctor;
