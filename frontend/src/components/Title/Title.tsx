import React from 'react';
import styles from './Title.module.scss';

interface Props {
  tinyHeader?: string;
  header?: string;
}

const Title: React.FC<Props> = ({ tinyHeader, header }) => (
  <>
    {tinyHeader && <div className={styles.tinyHeader}>{tinyHeader}</div>}
    {header && <div className={styles.header}>{header}</div>}
  </>
);

export default Title;
