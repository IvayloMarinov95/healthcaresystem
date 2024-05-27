import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Medicine from './Medicine/Medicine';
import styles from './Prescriptions.module.scss';
import { setIsLoading } from '../../features/spinner/isLoading-slice';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';
import { status } from '../../lib/constants';
import { useAppDispatch } from '../../app/hooks';
import { setToast } from '../../features/toast/toast-slice';

interface MedicineType {
  medicineName: string;
  quantity: string;
  consumptionFrequency: string;
  prescriptionDose: string;
  period: string;
}

const Prescriptions: React.FC = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [patients, setPatients] = useState<Array<object>>([]);
  const [disease, setDisease] = useState<string>('');
  const [diseasesList, setDiseasesList] = useState<Array<object>>([]);
  const [medicines, setMedicines] = useState<Array<object>>([{}]);
  const [additionalInformation, setAdditionalInformation] =
    useState<string>('');

  const [selectedPatient, setSelectedPatient] = useState<object>({});
  const [medicineList, setMedicineList] = useState<Array<MedicineType>>([
    {
      medicineName: '',
      quantity: '',
      consumptionFrequency: '',
      prescriptionDose: '',
      period: '',
    },
  ]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getPatients();
    getMedicines();
    getDiseases();
  }, []);

  const getMedicines = async () => {
    const url = 'http://localhost:5000/api/prescriptions/getMedicineList';
    await axios
      .get(url)
      .then((response) => {
        if (response?.data) {
          setMedicines(response.data.medications);
        }
      })
      .catch((error) => console.log('error: ', error));
  };

  const getDiseases = async () => {
    dispatch(setIsLoading(true));
    const url = 'http://localhost:5000/api/prescriptions/getDiseases';
    await axios
      .get(url)
      .then((response) => {
        if (response?.data) {
          setDiseasesList(response.data.diseases);
        }
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  const getPatients = async () => {
    const url =
      'http://localhost:5000/api/users/userByRole/' +
      '64f5f6963741f138f0d144e6';

    await axios
      .get(url)
      .then((response) => {
        if (response?.data) {
          setPatients(response.data.users);
        }
      })
      .catch((error) => console.log('error: ', error));
  };

  const renderTooltip = (props: object) => (
    <Tooltip id="button-tooltip" {...props}>
      Add another medicine
    </Tooltip>
  );

  const handleChange = (index: number, fieldName: string, value: string) => {
    const newMedicineList = [...medicineList];
    if (newMedicineList[index].hasOwnProperty(fieldName)) {
      // @ts-ignore
      newMedicineList[index][fieldName] = value;
    }
    setMedicineList(newMedicineList);
  };

  const handleSelectPatient = (option: { label: string; value: object }) => {
    setSelectedPatient(option.value);
  };

  const handleRemoveElement = (index: number) => {
    const newMedicineList = medicineList.filter((_, i) => i !== index);
    setMedicineList(newMedicineList);
  };

  const handleDiseaseChange = (option: { label: string; value: object }) => {
    // @ts-ignore
    setDisease(option?.value?._id);
  };

  const handleAdditionalInformationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdditionalInformation(e.target.value);
  };

  const addMedicineSection = () => {
    const newMedicineList = [...medicineList];
    newMedicineList.push({
      medicineName: '',
      quantity: '',
      consumptionFrequency: '',
      prescriptionDose: '',
      period: '',
    });
    setMedicineList(newMedicineList);
  };

  const clearData = () => {
    setSelectedPatient({});
    setDisease('');
    setAdditionalInformation('');
    setMedicineList([
      {
        medicineName: '',
        quantity: '',
        consumptionFrequency: '',
        prescriptionDose: '',
        period: '',
      },
    ]);
  };

  const assignPrescription = async () => {
    dispatch(setIsLoading(true));
    const url = 'http://localhost:5000/api/prescriptions/createPrescription';
    const prescriptionData = {
      // @ts-ignore
      patientName: selectedPatient?.name || null,
      disease: disease || null,
      additionalInformation: additionalInformation || null,
      status: status.PENDING,
      // @ts-ignore
      user: selectedPatient?._id || null,
      medicineList: medicineList || null,
    };

    await axios
      .post(url, prescriptionData)
      .then((response) => {
        if (response?.data) {
          dispatch(
            setToast({
              // @ts-ignore
              color: 'success',
              message: 'Prescription assigned successful!',
            })
          );
          clearData();
        }
      })
      .catch((error) => {
        dispatch(
          // @ts-ignore
          setToast({ color: 'danger', message: error.response.data.message })
        );
        console.log('error: ', error);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
        ref?.current?.scrollIntoView({ behavior: 'smooth' });
      });
  };

  return (
    <>
      <div>
        <div className={styles.title} ref={ref}>
          <h3>Prescription</h3>
        </div>
        <div className={styles.container}>
          <div className={styles.patient}>
            <Form.Group controlId="patient">
              <Form.Label>Patient</Form.Label>
              <Select
                options={patients.map((patient) => ({
                  // @ts-ignore
                  label: patient.name,
                  // @ts-ignore
                  value: patient,
                }))}
                // @ts-ignore
                onChange={(option) => handleSelectPatient(option)}
              />
            </Form.Group>
          </div>
          {medicineList &&
            medicineList?.map((item, index) => (
              <Medicine
                key={index}
                medicineList={medicines}
                index={index}
                medicine={item}
                handleChange={handleChange}
                handleRemoveElement={handleRemoveElement}
              />
            ))}
          <div className={styles.addSectionDiv}>
            <OverlayTrigger placement="right" overlay={renderTooltip}>
              <Button
                variant="primary"
                className={styles.addBtn}
                onClick={addMedicineSection}
              >
                <FaPlus />
              </Button>
            </OverlayTrigger>
          </div>
          <div className={styles.footer}>
            <div className={styles.patient}>
              <Form.Group controlId="patient">
                <Form.Label>Disease</Form.Label>
                <Select
                  options={diseasesList.map((disease) => ({
                    // @ts-ignore
                    label: disease.nameEn,
                    // @ts-ignore
                    value: disease,
                  }))}
                  // @ts-ignore
                  onChange={(option) => handleDiseaseChange(option)}
                />
              </Form.Group>
            </div>
            <Form.Group
              controlId="additionalInformation"
              className={styles.end}
            >
              <Form.Label>Additional Information</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter additional information"
                className={styles.textarea}
                value={additionalInformation}
                onChange={handleAdditionalInformationChange}
              />
            </Form.Group>
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        onClick={assignPrescription}
        className={styles.assignBtn}
      >
        Assign Prescription
      </Button>
    </>
  );
};

export default Prescriptions;
