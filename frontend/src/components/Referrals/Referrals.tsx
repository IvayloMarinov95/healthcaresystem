import React, { useEffect, useState } from 'react';
import SquareInputs from './components/SquareInputs/SquareInputs';
import styles from './Referrals.module.scss';

const Referrals: React.FC = () => {
  const [personalId, setPersonalId] = useState<string>('');
  const [rhif, setRhif] = useState<string>('');
  const [healthDistrict, setHealthDistrict] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');

  useEffect(() => {
    if (day && month && year) {
      setDateOfBirth(year + '-' + month + '-' + day);
    }
  }, [day, month, year]);

  const handlePersonalIdChange = (fieldValue: string) => {
    setPersonalId(fieldValue);
  };

  const handleRHIFChange = (fieldValue: string) => {
    setRhif(fieldValue);
  };

  const handleHealthDistrictChange = (fieldValue: string) => {
    setHealthDistrict(fieldValue);
  };

  const handleIdNumberChange = (fieldValue: string) => {
    setIdNumber(fieldValue);
  };

  const handleYearChange = (fieldValue: string) => {
    setYear(fieldValue);
  };

  const handleDayChange = (fieldValue: string) => {
    setDay(fieldValue);
  };

  const handleMonthChange = (fieldValue: string) => {
    setMonth(fieldValue);
  };

  const handleCountryCodeChange = (fieldValue: string) => {
    setCountryCode(fieldValue.toUpperCase());
  };

  return (
    <>
      <div className={styles.title}>
        <h3>Referral</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.firstRow}>
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
                <label className={styles.inputLabel}>
                  Identification Number
                </label>
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
            {/* <div>
              <div>{person}</div>
              <hr />
            </div> */}
          </div>
          <div className={styles.sendingDoctorSection}>
            <div className={styles.titleLabel}>REFERRING DOCTOR</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Referrals;
