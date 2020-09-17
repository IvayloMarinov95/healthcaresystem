import Accordion from "react-bootstrap/esm/Accordion";
import { Card } from "react-bootstrap";
import React from "react";
import styles from "./AccordionMenu.module.scss";

const AccordionMenu: React.FC = () => (
  <Accordion defaultActiveKey="0">
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0" className={styles.menu}>
        Who are we?
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          fermentum massa vel enim feugiat gravida. Phasellus velit risus,
          euismod a lacus et, mattis condimentum augue. Vivamus fermentum ex
          quis imperdiet sodales. Sed aliquam nibh tellus, a rutrum turpis
          pellentesque ac. Nulla nibh libero, tincidunt cursus gravida ut,
          sodales ut magna. Sed sodales libero sapien, et rutrum mi placerat
          eget. Nulla vestibulum lacus vel eros eleifend molestie. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum
          massa vel enim feugiat gravida.
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="1" className={styles.menu}>
        Our Services
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        <Card.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          fermentum massa vel enim feugiat gravida. Phasellus velit risus,
          euismod a lacus et, mattis condimentum augue. Vivamus fermentum ex
          quis imperdiet sodales. Sed aliquam nibh tellus, a rutrum turpis
          pellentesque ac. Nulla nibh libero, tincidunt cursus gravida ut,
          sodales ut magna. Sed sodales libero sapien, et rutrum mi placerat
          eget. Nulla vestibulum lacus vel eros eleifend molestie. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum
          massa vel enim feugiat gravida.
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="2" className={styles.menu}>
        Qualified Doctors
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="2">
        <Card.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          fermentum massa vel enim feugiat gravida. Phasellus velit risus,
          euismod a lacus et, mattis condimentum augue. Vivamus fermentum ex
          quis imperdiet sodales. Sed aliquam nibh tellus, a rutrum turpis
          pellentesque ac. Nulla nibh libero, tincidunt cursus gravida ut,
          sodales ut magna. Sed sodales libero sapien, et rutrum mi placerat
          eget. Nulla vestibulum lacus vel eros eleifend molestie. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum
          massa vel enim feugiat gravida.
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
);

export default AccordionMenu;
