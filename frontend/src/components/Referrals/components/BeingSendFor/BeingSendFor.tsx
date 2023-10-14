import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './BeingSendFor.module.scss';

type Props = {
  type: string;
  handleTypeSelect: (type: string) => void;
};

const BeingSendFor: React.FC<Props> = ({ type, handleTypeSelect }) => {
  return (
    <>
      <div className={styles.reason}>Reason: </div>
      <div className={styles.typeContainer}>
        <div className={styles.typeText}>Type:</div>
        <div>
          <Form.Group controlId="type1">
            <Form.Check
              type="checkbox"
              label="an acute illness or condition outside the other types"
              inline
              value={type}
              checked={type === 'AccuteIllnes' ? true : false}
              onChange={() => handleTypeSelect('AccuteIllnes')}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="type2">
            <Form.Check
              type="checkbox"
              label="chronic disease not subject to dispensary monitoring"
              inline
              value={type}
              checked={type === 'ChronicDisease' ? true : false}
              onChange={() => handleTypeSelect('ChronicDisease')}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="type3">
            <Form.Check
              type="checkbox"
              label="selection (pre-selection) of a specialist performing dispensary monitoring"
              inline
              value={type}
              checked={type === 'Selection' ? true : false}
              onChange={() => handleTypeSelect('Selection')}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="type4">
            <Form.Check
              type="checkbox"
              label="dispensary interdisciplinary monitoring"
              inline
              value={type}
              checked={type === 'DispensaryMonitoring' ? true : false}
              onChange={() => handleTypeSelect('DispensaryMonitoring')}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="type5">
            <Form.Check
              type="checkbox"
              label="prevention of health insured person over 18 years old - from risk groups"
              inline
              value={type}
              checked={type === 'Prevention' ? true : false}
              onChange={() => handleTypeSelect('Prevention')}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="type6">
            <Form.Check
              type="checkbox"
              label="initial selection of a specialist Obstetrician-Gynaecologist"
              inline
              value={type}
              checked={type === 'ObstGynaeSelection' ? true : false}
              onChange={() => handleTypeSelect('ObstGynaeSelection')}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="type7">
            <Form.Check
              type="checkbox"
              label="initial selection of a specialist pediatrician"
              inline
              value={type}
              checked={type === 'PediatristSelection' ? true : false}
              onChange={() => handleTypeSelect('PediatristSelection')}
            ></Form.Check>
          </Form.Group>
        </div>
      </div>
    </>
  );
};

export default BeingSendFor;
