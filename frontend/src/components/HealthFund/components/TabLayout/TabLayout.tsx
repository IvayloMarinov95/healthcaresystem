import React, { useEffect, useState } from 'react';
import { Col, Nav, Row, Tab, Card } from 'react-bootstrap';
import PrescriptionsApplications from '../PrescriptionsApplications/PrescriptionsApplications';
import ReferralsApplications from '../ReferralsApplications/ReferralsApplications';
import styles from '../../HealthFund.module.scss';
import classNames from 'classnames';
import DoctorsSection from '../DoctorsSection/DoctorsSection';
import PatientSection from '../PatientSection/PatientSection';
import axios from 'axios';
import { setIsLoading } from '../../../../features/spinner/isLoading-slice';
import { useAppDispatch } from '../../../../app/hooks';

const TabLayout = () => {
  const [doctors, setDoctors] = useState<Array<object>>([]);
  const [patients, setPatients] = useState<Array<object>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getDoctors();
    getPatients();
  }, []);

  const getDoctors = async () => {
    dispatch(setIsLoading(true));
    const url =
      'http://localhost:5000/api/users/userByRole/' +
      '64ec71860b9e3c40588277d3';
    await axios
      .get(url)
      .then((response) => {
        if (response.data) {
          setDoctors(response.data.users);
        }
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  const getPatients = async () => {
    dispatch(setIsLoading(true));
    const url =
      'http://localhost:5000/api/users/userByRole/' +
      '64f5f6963741f138f0d144e6';
    await axios
      .get(url)
      .then((response) => {
        if (response.data) {
          setPatients(response.data.users);
        }
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="1">
      <Row className={styles.row}>
        <Col sm={3} className={styles.column1}>
          <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
              <Nav
                variant="pills"
                className={classNames('flex-column', styles.nav)}
              >
                <Nav.Item>
                  <Nav.Link eventKey="1" className={styles.navTab}>
                    Referral Applications
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2" className={styles.navTab}>
                    Prescription Applications
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="3" className={styles.navTab}>
                    Doctors
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="4" className={styles.navTab}>
                    Patients
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={9}>
          <Card className={styles.rightSide}>
            <Card.Body className={styles.cardBody}>
              <Tab.Content>
                <Tab.Pane eventKey="1">
                  <ReferralsApplications />
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <PrescriptionsApplications />
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <DoctorsSection getDoctors={getDoctors} doctors={doctors} />
                </Tab.Pane>
                <Tab.Pane eventKey="4">
                  <PatientSection
                    getPatients={getPatients}
                    patients={patients}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default TabLayout;
