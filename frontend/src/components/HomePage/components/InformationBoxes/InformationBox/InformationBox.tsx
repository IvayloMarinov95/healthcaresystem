import React from "react";
import classNames from "classnames";
import styles from "./InformationBox.module.scss";

interface Props {
  style: string;
  service: string;
  description: string | React.ReactNode;
}

const InformationBox: React.FC<Props> = ({ style, service, description }) => (
  <div className={classNames(styles.container, style)}>
    <div className={styles.service}>
      <h3>{service}</h3>
    </div>
    <div>{description}</div>
  </div>
);

export default InformationBox;
