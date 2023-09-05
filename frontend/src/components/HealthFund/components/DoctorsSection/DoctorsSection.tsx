import React, { useState } from 'react';
import styles from '../../HealthFund.module.scss';
import Search from '../../../Search/Search';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import classNames from 'classnames';

const DoctorsSection: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  return (
    <>
      <Search input={input} handleChange={handleChange} />
      <div className={styles.addDoctorDiv}>
        <Button variant="primary" className={classNames(styles.addDoctor, styles.tooltip)}>
          <FaPlus />
        <span className={styles.tooltiptext}>Add</span>
        </Button>
      </div>
    </>
  );
};

export default DoctorsSection;
