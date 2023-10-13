import React, { useEffect, useState } from 'react';
import styles from './Referrals.module.scss';
import PatientInfo from './components/PatientInfo/PatientInfo';
import ReferringDoctor from './components/ReferringDoctor/ReferringDoctor';
import SquareInputs from './components/SquareInputs/SquareInputs';
import Diagnoses from './components/Diagnoses/Diagnoses';
import Doctor from './components/Doctor/Doctor';

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
  const [person, setPerson] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [residentialComplex, setResidentialComplex] = useState<string>('');
  const [entrance, setEntrance] = useState<string>('');
  const [block, setBlock] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [apartment, setApartment] = useState<string>('');
  const [medicalPlaceRegNumber, setMedicalPlaceRegNumber] =
    useState<string>('');
  const [doctorIdNumber, setDoctorIdNumber] = useState<string>('');
  const [replacementDoctorIdNumber, setReplacementDoctorIdNumber] =
    useState('');
  const [doctorType, setDoctorType] = useState<string>('');
  const [doctorName, setDoctorName] = useState<string>('');
  const [specialtyCode, setSpecialtyCode] = useState<string>('');
  const [referralNumber, setReferralNumber] = useState<string>('');
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState<string>('');
  const [accompanyingIllness1, setAccompanyingIllness1] = useState<string>('');
  const [accompanyingIllness2, setAccompanyingIllness2] = useState<string>('');
  const [medicalPlaceRegisterNumber, setMedicalPlaceRegisterNumber] =
    useState<string>('');
  const [doctorSectionName, setDoctorSectionName] = useState<string>('');
  const [doctorSpecialtyCode, setDoctorSpecialtyCode] = useState<string>('');
  const [doctorSectionPersonalId, setDoctorSectionPersonalId] =
    useState<string>('');

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

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const handleStreetNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetNumber(e.target.value);
  };

  const handleResidentialComplexChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResidentialComplex(e.target.value);
  };
  const handleBlockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlock(e.target.value);
  };

  const handleEntranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntrance(e.target.value);
  };

  const handleFloorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFloor(e.target.value);
  };

  const handleApartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApartment(e.target.value);
  };

  const handleMedicalPlaceRegNumberChange = (fieldValue: string) => {
    setMedicalPlaceRegNumber(fieldValue);
  };

  const handleDoctorIdNumberChange = (fieldValue: string) => {
    setDoctorIdNumber(fieldValue);
  };

  const handleReplacementDoctorIdNumberChange = (fieldValue: string) => {
    setReplacementDoctorIdNumber(fieldValue);
  };

  const handleEmployedClicked = () => {
    setDoctorType('Employed');
  };

  const handleReplacingClicked = () => {
    setDoctorType('Replacing');
  };

  const handleDoctorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorName(e.target.value);
  };

  const handleSpecialtyCodeChange = (fieldValue: string) => {
    setSpecialtyCode(fieldValue);
  };

  const handleReferralNumberChange = (fieldValue: string) => {
    setReferralNumber(fieldValue);
  };

  const handlePrimaryDiagnosisChange = (fieldValue: string) => {
    setPrimaryDiagnosis(fieldValue);
  };

  const handleAccompanyingIllnes1Change = (fieldValue: string) => {
    setAccompanyingIllness1(fieldValue);
  };

  const handleAccompanyingIllnes2Change = (fieldValue: string) => {
    setAccompanyingIllness2(fieldValue);
  };

  const handleMedicalPlaceRegisterNumberChange = (fieldValue: string) => {
    setMedicalPlaceRegisterNumber(fieldValue);
  };

  const handleDoctorSpecialtyCodeChange = (fieldValue: string) => {
    setDoctorSpecialtyCode(fieldValue);
  };

  const handleDoctorSectionNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDoctorSectionName(e.target.value);
  };

  const handleDoctorSectionPersonalIdChange = (fieldValue: string) => {
    setDoctorSectionPersonalId(fieldValue);
  };

  return (
    <>
      <div className={styles.title}>
        <h3>Referral</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.firstRow}>
          <PatientInfo
            personalId={personalId}
            handlePersonalIdChange={handlePersonalIdChange}
            rhif={rhif}
            handleRHIFChange={handleRHIFChange}
            healthDistrict={healthDistrict}
            handleHealthDistrictChange={handleHealthDistrictChange}
            idNumber={idNumber}
            handleIdNumberChange={handleIdNumberChange}
            countryCode={countryCode}
            handleCountryCodeChange={handleCountryCodeChange}
            day={day}
            handleDayChange={handleDayChange}
            month={month}
            handleMonthChange={handleMonthChange}
            year={year}
            handleYearChange={handleYearChange}
            person={person}
            handlePersonChange={handlePersonChange}
            city={city}
            handleCityChange={handleCityChange}
            street={street}
            handleStreetChange={handleStreetChange}
            streetNumber={streetNumber}
            handleStreetNumberChange={handleStreetNumberChange}
            residentialComplex={residentialComplex}
            handleResidentialComplexChange={handleResidentialComplexChange}
            block={block}
            handleBlockChange={handleBlockChange}
            entrance={entrance}
            handleEntranceChange={handleEntranceChange}
            floor={floor}
            handleFloorChange={handleFloorChange}
            apartment={apartment}
            handleApartmentChange={handleApartmentChange}
          />
          <div className={styles.sendingDoctorSection}>
            <ReferringDoctor
              medicalPlaceRegNumber={medicalPlaceRegNumber}
              handleMedicalPlaceRegNumberChange={
                handleMedicalPlaceRegNumberChange
              }
              doctorIdNumber={doctorIdNumber}
              handleDoctorIdNumberChange={handleDoctorIdNumberChange}
              replacementDoctorIdNumber={replacementDoctorIdNumber}
              handleReplacementDoctorIdNumberChange={
                handleReplacementDoctorIdNumberChange
              }
              doctorType={doctorType}
              handleEmployedClicked={handleEmployedClicked}
              handleReplacingClicked={handleReplacingClicked}
              doctorName={doctorName}
              handleDoctorNameChange={handleDoctorNameChange}
              specialtyCode={specialtyCode}
              handleSpecialtyCodeChange={handleSpecialtyCodeChange}
            />
          </div>
        </div>
        <div className={styles.secondRow}>
          <div className={styles.secondRowContainer}>
            <div className={styles.refNumberContainer}>
              <div className={styles.titleLabel}>MEDICAL REFERRAL NUMBER</div>
              <div>
                <SquareInputs
                  numberOfInputs={6}
                  fieldValue={referralNumber}
                  containerClass={styles.referralNumber}
                  characterClass={styles.characters}
                  handleChange={handleReferralNumberChange}
                />
              </div>
            </div>
            <div>
              <Diagnoses
                primaryDiagnosis={primaryDiagnosis}
                handlePrimaryDiagnosisChange={handlePrimaryDiagnosisChange}
                accompanyingIllness1={accompanyingIllness1}
                handleAccompanyingIllnes1Change={
                  handleAccompanyingIllnes1Change
                }
                accompanyingIllness2={accompanyingIllness2}
                handleAccompanyingIllnes2Change={
                  handleAccompanyingIllnes2Change
                }
              />
            </div>
          </div>
          <Doctor
            medicalPlaceRegNumber={medicalPlaceRegisterNumber}
            handleMedicalPlaceRegisterNumberChange={
              handleMedicalPlaceRegisterNumberChange
            }
            doctorSpecialtyCode={doctorSpecialtyCode}
            handleDoctorSpecialtyCodeChange={handleDoctorSpecialtyCodeChange}
            doctorName={doctorSectionName}
            handleDoctorNameChange={handleDoctorSectionNameChange}
            doctorSectionPersonalId={doctorSectionPersonalId}
            handleDoctorSectionPersonalIdChange={
              handleDoctorSectionPersonalIdChange
            }
          />
        </div>
      </div>
    </>
  );
};

export default Referrals;
