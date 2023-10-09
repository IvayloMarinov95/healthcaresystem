import React, { useEffect, useState } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Medicine from './Medicine/Medicine';
import styles from './Prescriptions.module.scss';
import { setIsLoading } from '../../features/spinner/isLoading-slice';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

interface MedicineType {
  medicineName: string;
  quantity: string;
  consumptionFrequency: string;
  prescriptionDose: string;
  period: string;
}

const Prescriptions: React.FC = () => {
  const [patients, setPatients] = useState<Array<object>>([]);
  const [medicineList, setMedicineList] = useState<Array<MedicineType>>([
    {
      medicineName: '',
      quantity: '',
      consumptionFrequency: '',
      prescriptionDose: '',
      period: '',
    },
  ]);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    setIsLoading(true);
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
      .catch((error) => console.log('error: ', error))
      .finally(() => setIsLoading(false));
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

  const handleRemoveElement = (index: number) => {
    const newMedicineList = medicineList.filter((_, i) => i !== index);
    setMedicineList(newMedicineList);
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

  return (
    <div className={styles.prescriptions}>
      <div className={styles.title}>
        <h3>Prescription</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.patient}>
          <Form.Group controlId="patient">
            <Form.Label>Patient</Form.Label>
            <Form.Control
              list="patients"
              type="search"
              placeholder="Enter patient name"
              // value={quantity}
              // onChange={handleQuantityChange}
            />
            <datalist id="patients">
              {patients?.map((patient, index) => (
                // @ts-ignore
                <option key={index} value={patient.name} />
              ))}
            </datalist>
          </Form.Group>
        </div>
        {medicineList &&
          medicineList?.map((item, index) => (
            <Medicine
              key={index}
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
          <Form.Group controlId="disease" className={styles.end}>
            <Form.Label>Disease</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quantity"
              // value={quantity}
              // onChange={handleQuantityChange}
            />
          </Form.Group>
          <Form.Group controlId="additionalInformation" className={styles.end}>
            <Form.Label>Additional Information</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter additional information"
              className={styles.textarea}
              // value={quantity}
              // onChange={handleQuantityChange}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
