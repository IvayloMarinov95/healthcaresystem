import React from "react";
import styles from "./Title.module.scss";

interface Props {
  tinyHeader: string;
  header: string;
}

const Title: React.FC<Props> = ({ tinyHeader, header }) => (
  <>
    <div className={styles.tinyHeader}>{tinyHeader}</div>
    <div className={styles.header}>{header}</div>
  </>
);

export default Title;
