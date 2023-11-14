import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { FaAngleDown, FaAngleRight, FaCheck, FaTimes } from 'react-icons/fa';
import styles from '../../HealthFund.module.scss';
import Search from '../../../Search/Search';
import { setIsLoading } from '../../../../features/spinner/isLoading-slice';
import axios from 'axios';
import { reasons } from '../../../../lib/constants';

const PrescriptionsApplications = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [prescriptions, setPrescriptions] = useState<Array<object>>([]);
  const [filteredList, setFilteredList] = useState<Array<object>>([]);

  useEffect(() => {
    getPrescriptions();
  }, []);

  useEffect(() => {
    if (input) {
      const filter = prescriptions?.filter((item) =>
        // @ts-ignore
        item.disease.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredList(filter);
    } else {
      setFilteredList(prescriptions);
    }
  }, [input, prescriptions]);

  const getPrescriptions = async () => {
    setIsLoading(true);
    const url = 'http://localhost:5000/api/prescriptions';
    await axios
      .get(url)
      .then((response) => {
        if (response?.data?.prescriptions) {
          setPrescriptions(response.data.prescriptions);
        }
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => setIsLoading(false));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Search input={input} handleChange={handleChange} />
      <Accordion defaultActiveKey="0" className={styles.accordions}>
        {filteredList?.length > 0 &&
          filteredList?.map((prescription) => (
            // @ts-ignore
            <Card key={prescription._id}>
              <Accordion.Toggle
                as={Card.Header}
                // @ts-ignore
                eventKey={prescription._id}
                className={styles.cardHeader}
                onClick={() => handleClick()}
              >
                <div>{!toggle ? <FaAngleRight /> : <FaAngleDown />}</div>
                <div>
                  Prescription for the treatment of {/* @ts-ignore */}
                  <b>{prescription.disease}</b>
                </div>
              </Accordion.Toggle>
              {/* @ts-ignore */}
              <Accordion.Collapse eventKey={prescription._id}>
                <Card.Body className={styles.collapse}>
                  <div className={styles.referralsDataContainer}>
                    <div className={styles.referralsDataSections}>
                      <div className={styles.dataDiv}>
                        Patient:{' '}
                        <b className={styles.data}>
                          {/* @ts-ignore */}
                          {prescription.patientName}
                        </b>
                      </div>
                    </div>
                    <div className={styles.referralsDataSections}>
                      <div className={styles.dataDiv}>
                        Medicine list:{' '}
                        <b className={styles.data}>
                          {/* @ts-ignore */}
                          {prescription.referringDoctorFullName}
                        </b>
                      </div>
                    </div>
                    <div>
                      {/* @ts-ignore */}
                      {prescription?.medicineList?.length > 0 &&
                        // @ts-ignore
                        prescription.medicineList?.map((item) => (
                          <div className={styles.medicineRow} key={item._id}>
                            <div>
                              <div>Medicine name: </div>
                              <b className={styles.data}>
                                {/* @ts-ignore */}
                                {item.medicineName}
                              </b>
                            </div>
                            <div>
                              <div>Quantity: </div>
                              <b className={styles.data}>
                                {/* @ts-ignore */}
                                {item.quantity}
                              </b>
                            </div>
                            <div>
                              <div>Period: </div>
                              <b className={styles.data}>
                                {/* @ts-ignore */}
                                {item.period}
                              </b>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div>
                      <div>
                        Additional information:{' '}
                        <b className={styles.data}>
                          {/* @ts-ignore */}
                          {reasons[prescription.additionalInformation]}
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className={styles.referralBtns}>
                    <Button variant="primary">
                      <FaCheck />
                    </Button>{' '}
                    <Button variant="danger">
                      <FaTimes />
                    </Button>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
      </Accordion>
    </>
  );
};

export default PrescriptionsApplications;
