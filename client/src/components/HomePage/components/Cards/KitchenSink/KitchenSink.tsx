import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

import React from "react";
import styles from "./KitchenSink.module.scss";

interface Props {
  image: string;
  title: string;
  text: string;
  item1: string;
  item2: string | React.ReactNode;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const KitchenSink: React.FC<Props> = ({
  image,
  title,
  text,
  item1,
  item2,
  handleClick,
}) => (
  <Card className={styles.card} onClick={handleClick}>
    <Card.Img variant="top" src={image} />
    <Card.Body className={styles.body}>
      <Card.Title className={styles.title}>{title}</Card.Title>
      <Card.Text className={styles.text}>{text}</Card.Text>
    </Card.Body>
    <ListGroup>
      <ListGroupItem className={styles.group}>{item1}</ListGroupItem>
      <ListGroupItem>{item2}</ListGroupItem>
    </ListGroup>
  </Card>
);

export default KitchenSink;
