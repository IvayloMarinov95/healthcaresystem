import React, { useState } from 'react';
import { Col, Nav, Row, Tab, Card } from 'react-bootstrap';
import RequestAccordion from '../RequestAccordion/RequestAccordion';
import styles from '../../HealthFund.module.scss';
import classNames from 'classnames';
import Search from '../../../Search/Search';
import DoctorsSection from '../DoctorsSection/DoctorsSection';

const TabLayout = () => {
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
                    Заявления
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2" className={styles.navTab}>
                    Доктори
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="3" className={styles.navTab}>
                    Пациенти
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
                  <RequestAccordion />
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <DoctorsSection />
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
