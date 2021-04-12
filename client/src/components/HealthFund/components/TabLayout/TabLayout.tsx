import React from "react";
import { Col, Nav, Row, Tab, Card } from "react-bootstrap";
import RequestAccordion from "../RequestAccordion/RequestAccordion";
import styles from "../../HealthFund.module.scss";
import classNames from "classnames";

const TabLayout = () => (
  <Tab.Container id="left-tabs-example" defaultActiveKey="1">
    <Row>
      <Col sm={3} className={styles.column1}>
        <Card>
          <Card.Body className={styles.cardBody}>
            <Nav
              variant="pills"
              className={classNames("flex-column", styles.nav)}
            >
              <Nav.Item>
                <Nav.Link eventKey="1">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2">Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={8}>
        <Tab.Content>
          <Tab.Pane eventKey="1">
            <RequestAccordion />
          </Tab.Pane>
          <Tab.Pane eventKey="second"></Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
);

export default TabLayout;
