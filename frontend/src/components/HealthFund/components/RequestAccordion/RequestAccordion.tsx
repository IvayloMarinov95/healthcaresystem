import React, { useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { FaAngleDown, FaAngleRight, FaCheck, FaTimes } from "react-icons/fa";
import styles from "../../HealthFund.module.scss";

const RequestAccordion = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <Accordion defaultActiveKey="0" className={styles.accordions}>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          eventKey="1"
          className={styles.cardHeader}
          onClick={() => handleClick()}
        >
          <div>{!toggle ? <FaAngleRight /> : <FaAngleDown />}</div>
          <div>Заявление от "Име" за "причина"</div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body className={styles.collapse}>
            <div>Hello! I'm the body</div>
            <div>
              <Button variant="success">
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
  );
};

export default RequestAccordion;
