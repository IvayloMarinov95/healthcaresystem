import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import Medicine from './Medicine/Medicine';
import styles from './Prescriptions.module.scss';
import { setIsLoading } from '../../features/spinner/isLoading-slice';
import axios from 'axios';

const Prescriptions: React.FC = () => {
  const [patients, setPatients] = useState<Array<object>>([]);

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
              {patients?.map((patient) => (
                // @ts-ignore
                <option value={patient.name} />
              ))}
            </datalist>
          </Form.Group>
        </div>
        <Medicine key="1" />
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
