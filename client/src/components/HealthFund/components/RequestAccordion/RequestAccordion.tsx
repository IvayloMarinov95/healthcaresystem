import React, { useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { FaAngleDown, FaAngleLeft, FaCheck, FaTimes } from "react-icons/fa";
import styles from "../../HealthFund.module.scss";

const RequestAccordion = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <Card>
      <Card.Body>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="1"
              className={styles.cardHeader}
              onClick={() => handleClick()}
            >
              <div>Заявление от "Име" за "причина"</div>
              <div>{!toggle ? <FaAngleDown /> : <FaAngleLeft />}</div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body className={styles.cardHeader}>
                <div>Hello! I'm the body</div>
                <div>
                  <Button variant="primary">
                    <FaCheck />
                  </Button>{" "}
                  <Button variant="danger">
                    <FaTimes />
                  </Button>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default RequestAccordion;
