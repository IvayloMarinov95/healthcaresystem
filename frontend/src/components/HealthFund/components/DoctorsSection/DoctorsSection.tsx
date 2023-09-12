import React, { useState } from 'react';
import styles from '../../HealthFund.module.scss';
import Search from '../../../Search/Search';
import {
  Button,
  Card,
  ListGroup,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import AddDoctorForm from './AddDoctorForm/AddDoctorForm';
import stylesDocSection from './DoctorsSection.module.scss';

interface Props {
  doctors: Array<object>;
}

const DoctorsSection: React.FC<Props> = ({ doctors }) => {
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
      <div>
        {doctors?.length > 0 &&
          doctors?.map((doctor) => (
            // @ts-ignore
            <Card className={stylesDocSection.card} key={doctor.email}>
              <Card.Body>
                {/* @ts-ignore */}
                <Card.Title>{doctor.name}</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <Button variant="primary">Card Link</Button>
                      <Button variant="danger">Another Link</Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
      </div>
      <AddDoctorForm modalState={showAddForm} showForm={showForm} />
    </>
  );
};

export default DoctorsSection;
