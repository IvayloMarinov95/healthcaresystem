import React, { useState } from 'react';
import styles from '../../HealthFund.module.scss';
import Search from '../../../Search/Search';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import AddDoctorForm from './AddDoctorForm/AddDoctorForm';

const DoctorsSection: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const renderTooltip = (props: object) => (
    <Tooltip id="button-tooltip" {...props}>
      Add
    </Tooltip>
  );

  const showForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  return (
    <>
      <Search input={input} handleChange={handleChange} />
      <div className={styles.addDoctorDiv}>
        <OverlayTrigger placement="right" overlay={renderTooltip}>
          <Button
            variant="primary"
            className={styles.addDoctor}
            onClick={showForm}
          >
            <FaPlus />
          </Button>
        </OverlayTrigger>
      </div>
      <AddDoctorForm modalState={showAddForm} showForm={showForm} />
    </>
  );
};

export default DoctorsSection;
