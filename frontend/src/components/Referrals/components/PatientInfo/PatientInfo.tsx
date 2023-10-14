import React from 'react';
import SquareInputs from '../SquareInputs/SquareInputs';
import { Form } from 'react-bootstrap';
import Title from '../../../Title/Title';
import styles from './PatientInfo.module.scss';

type Props = {
  personalId: string;
  handlePersonalIdChange: (fieldValue: string) => void;
  rhif: string;
  handleRHIFChange: (fieldValue: string) => void;
  healthDistrict: string;
  handleHealthDistrictChange: (fieldValue: string) => void;
  idNumber: string;
  handleIdNumberChange: (fieldValue: string) => void;
  countryCode: string;
  handleCountryCodeChange: (fieldValue: string) => void;
  day: string;
  handleDayChange: (fieldValue: string) => void;
  month: string;
  handleMonthChange: (fieldValue: string) => void;
  year: string;
  handleYearChange: (fieldValue: string) => void;
  person: string;
  handlePersonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  city: string;
  handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  street: string;
  handleStreetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  streetNumber: string;
  handleStreetNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  residentialComplex: string;
  handleResidentialComplexChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  block: string;
  handleBlockChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  entrance: string;
  handleEntranceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  floor: string;
  handleFloorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  apartment: string;
  handleApartmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PatientInfo: React.FC<Props> = ({
  personalId,
  handlePersonalIdChange,
  rhif,
  handleRHIFChange,
  healthDistrict,
  handleHealthDistrictChange,
  idNumber,
  handleIdNumberChange,
  countryCode,
  handleCountryCodeChange,
  day,
  handleDayChange,
  month,
  handleMonthChange,
  year,
  handleYearChange,
  person,
  handlePersonChange,
  city,
  handleCityChange,
  street,
  handleStreetChange,
  streetNumber,
  handleStreetNumberChange,
  residentialComplex,
  handleResidentialComplexChange,
  block,
  handleBlockChange,
  entrance,
  handleEntranceChange,
  floor,
  handleFloorChange,
  apartment,
  handleApartmentChange,
}) => (
  <div className={styles.patientContainer}>
    <div className={styles.patientSection}>
      <div className={styles.titleLabel}>PATIENT</div>
      <div className={styles.patientInputs}>
        <div>
          <SquareInputs
            numberOfInputs={10}
            fieldValue={personalId}
            containerClass={styles.personalId}
            characterClass={styles.characters}
            handleChange={handlePersonalIdChange}
          />
          <label className={styles.inputLabel}>
            Personal ID of the patient
          </label>
        </div>
        <div>
          <SquareInputs
            numberOfInputs={2}
            fieldValue={rhif}
            containerClass={styles.healthDistrict}
            characterClass={styles.characters}
            handleChange={handleRHIFChange}
          />
          <label className={styles.inputLabel}>RHIF</label>
        </div>
        <div>
          <SquareInputs
            numberOfInputs={2}
            fieldValue={healthDistrict}
            containerClass={styles.healthDistrict}
            characterClass={styles.characters}
            handleChange={handleHealthDistrictChange}
          />
          <label className={styles.inputLabel}>health district</label>
        </div>
      </div>
    </div>
    <div className={styles.idNumberSection}>
      <div className={styles.idContainer}>
        <SquareInputs
          numberOfInputs={20}
          fieldValue={idNumber}
          containerClass={styles.identificationNumber}
          characterClass={styles.characters}
          handleChange={handleIdNumberChange}
        />
        <label className={styles.inputLabel}>Identification Number</label>
      </div>
      <div>
        <SquareInputs
          numberOfInputs={2}
          fieldValue={countryCode}
          containerClass={styles.days}
          characterClass={styles.characters}
          handleChange={handleCountryCodeChange}
        />
        <label className={styles.inputLabel}>Country Code</label>
      </div>
    </div>
    <div className={styles.person}>
      <div className={styles.dateOfBirthContainer}>
        <div className={styles.dateOfBirth}>
          <div>
            <SquareInputs
              numberOfInputs={2}
              fieldValue={day}
              containerClass={styles.days}
              characterClass={styles.characters}
              handleChange={handleDayChange}
            />
          </div>
          <div className={styles.dot}>.</div>
          <div>
            <SquareInputs
              numberOfInputs={2}
              fieldValue={month}
              containerClass={styles.days}
              characterClass={styles.characters}
              handleChange={handleMonthChange}
            />
          </div>
          <div className={styles.dot}>.</div>
          <div>
            <SquareInputs
              numberOfInputs={4}
              fieldValue={year}
              containerClass={styles.year}
              characterClass={styles.characters}
              handleChange={handleYearChange}
            />
          </div>
        </div>
        <label className={styles.inputLabel}>Date of Birth</label>
      </div>
      <div className={styles.personName}>
        <Form.Group controlId="patientFullName">
          <Form.Control
            type="text"
            placeholder="Enter patient's full name"
            value={person}
            onChange={handlePersonChange}
          />
          <Form.Label>Full name of patient</Form.Label>
        </Form.Group>
      </div>
    </div>
    <div>
      <Title tinyHeader="Address" />
      <div>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleCityChange}
          />
        </Form.Group>
      </div>
      <div className={styles.streetAndNumber}>
        <div className={styles.street}>
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street"
              value={street}
              onChange={handleStreetChange}
            />
          </Form.Group>
        </div>
        <div className={styles.streetNumber}>
          <Form.Group controlId="streetNumber">
            <Form.Label>No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter number of street"
              value={streetNumber}
              onChange={handleStreetNumberChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className={styles.residence}>
        <div className={styles.residentialComplex}>
          <Form.Group controlId="residentialComplex">
            <Form.Label>Residential Complex</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter residential complex"
              value={residentialComplex}
              onChange={handleResidentialComplexChange}
            />
          </Form.Group>
        </div>
        <div className={styles.otherResidenceFields}>
          <Form.Group controlId="block">
            <Form.Label>Bl.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bl."
              value={block}
              onChange={handleBlockChange}
            />
          </Form.Group>
        </div>
        <div className={styles.otherResidenceFields}>
          <Form.Group controlId="entrance">
            <Form.Label>Entr.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter entr."
              value={entrance}
              onChange={handleEntranceChange}
            />
          </Form.Group>
        </div>
        <div className={styles.otherResidenceFields}>
          <Form.Group controlId="floor">
            <Form.Label>Fl.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter fl."
              value={floor}
              onChange={handleFloorChange}
            />
          </Form.Group>
        </div>
        <div className={styles.otherResidenceFields}>
          <Form.Group controlId="apartment">
            <Form.Label>Ap.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ap."
              value={apartment}
              onChange={handleApartmentChange}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  </div>
);

export default PatientInfo;
