import React from 'react';
import styles from './ReferringDoctor.module.scss';
import SquareInputs from '../SquareInputs/SquareInputs';
import { Form } from 'react-bootstrap';

type Props = {
  medicalPlaceRegNumber: string;
  handleMedicalPlaceRegNumberChange: (fieldValue: string) => void;
  doctorIdNumber: string;
  handleDoctorIdNumberChange: (fieldValue: string) => void;
  replacementDoctorIdNumber: string;
  handleReplacementDoctorIdNumberChange: (fieldValue: string) => void;
  doctorType: string;
  handleEmployedClicked: () => void;
  handleReplacingClicked: () => void;
  doctorName: string;
  handleDoctorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  specialtyCode: string;
  handleSpecialtyCodeChange: (fieldValue: string) => void;
};

const ReferringDoctor: React.FC<Props> = ({
  medicalPlaceRegNumber,
  handleMedicalPlaceRegNumberChange,
  doctorIdNumber,
  handleDoctorIdNumberChange,
  replacementDoctorIdNumber,
  handleReplacementDoctorIdNumberChange,
  doctorType,
  handleEmployedClicked,
  handleReplacingClicked,
  doctorName,
  handleDoctorNameChange,
  specialtyCode,
  handleSpecialtyCodeChange,
}) => (
  <>
    <div className={styles.titleLabel}>REFERRING DOCTOR</div>
    <div className={styles.regNumbersContainer}>
      <div>
        <SquareInputs
          numberOfInputs={10}
          fieldValue={medicalPlaceRegNumber}
          containerClass={styles.regNumbers}
          characterClass={styles.characters}
          handleChange={handleMedicalPlaceRegNumberChange}
        />
        <label className={styles.inputLabel}>
          Reg. Number of the medical place
        </label>
      </div>
      <div>
        <SquareInputs
          numberOfInputs={10}
          fieldValue={doctorIdNumber}
          containerClass={styles.regNumbers}
          characterClass={styles.characters}
          handleChange={handleDoctorIdNumberChange}
        />
        <label className={styles.inputLabel}>Personal ID of the doctor</label>
      </div>
      <div>
        <SquareInputs
          numberOfInputs={10}
          fieldValue={replacementDoctorIdNumber}
          containerClass={styles.regNumbers}
          characterClass={styles.characters}
          handleChange={handleReplacementDoctorIdNumberChange}
        />
        <label className={styles.inputLabel}>
          Personal ID of the replacement doctor
        </label>
      </div>
    </div>
    <div className={styles.checkboxSection}>
      <Form.Group controlId="type">
        <Form.Check
          type="checkbox"
          label="Employed"
          inline
          value={doctorType}
          checked={doctorType === 'Employed' ? true : false}
          onChange={handleEmployedClicked}
        ></Form.Check>
        <Form.Check
          type="checkbox"
          label="Female"
          inline
          value={doctorType}
          checked={doctorType === 'Replacing' ? true : false}
          onChange={handleReplacingClicked}
        ></Form.Check>
      </Form.Group>
    </div>
    <div className={styles.specialtyCodeSection}>
      <div>
        <SquareInputs
          numberOfInputs={2}
          fieldValue={specialtyCode}
          containerClass={styles.specialtyCode}
          characterClass={styles.characters}
          handleChange={handleSpecialtyCodeChange}
        />
        <label className={styles.inputLabel}>Specialty code</label>
      </div>
      <div className={styles.nameAndLastName}>
        <Form.Group controlId="doctorName">
          <Form.Control
            type="text"
            placeholder="Enter Firstname and Lastname"
            value={doctorName}
            onChange={handleDoctorNameChange}
          />
          <Form.Label>Firstname and Lastname</Form.Label>
        </Form.Group>
      </div>
    </div>
  </>
);

export default ReferringDoctor;
