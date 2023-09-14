import React, { useEffect, useState } from 'react';
import styles from '../../HealthFund.module.scss';
import Search from '../../../Search/Search';
import {
  Button,
  Card,
  ListGroup,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import {
  FaEnvelope,
  FaFemale,
  FaMale,
  FaMobileAlt,
  FaPlus,
} from 'react-icons/fa';
import AddPatientForm from '../AddPersonForm/AddPersonForm';
import stylesDocSection from '../DoctorsSection/DoctorsSection.module.scss';
import { setIsLoading } from '../../../../features/spinner/isLoading-slice';
import axios from 'axios';
import PersonalInformation from '../PersonalInformation/PersonalInformation';

interface Props {
  patients: Array<object>;
  getPatients: () => void;
}

const PatientSection: React.FC<Props> = ({ patients, getPatients }) => {
  const [filteredList, setFilteredList] = useState<Array<object>>([]);
  const [input, setInput] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  useEffect(() => {
    if (patients) {
      setFilteredList(patients);
    }
  }, [patients]);

  useEffect(() => {
    if (input) {
      // @ts-ignore
      const filter = patients?.filter((item) => item.name.includes(input));
      setFilteredList(filter);
    } else {
      setFilteredList(patients);
    }
  }, [input]);

  const renderTooltip = (props: object) => (
    <Tooltip id="button-tooltip" {...props}>
      Add
    </Tooltip>
  );

  const showForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const deleteUser = async (id: string) => {
    setIsLoading(true);
    const url = 'http://localhost:5000/api/users/deleteUser/' + id;
    await axios
      .delete(url)
      .then(() => getPatients())
      .catch((error) => console.log('error: ', error))
      .finally(() => setIsLoading(false));
  };

  const showEdit = () => {
    setShowEditForm(!showEditForm);
  };

  const editInfo = (id: string) => {
    showEdit();
    setUserId(id);
  };

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
      <div className={stylesDocSection.cardContainer}>
        {filteredList?.length > 0 &&
          filteredList?.map((doctor) => (
            // @ts-ignore
            <Card className={stylesDocSection.card} key={doctor.email}>
              <Card.Body>
                {/* @ts-ignore */}
                <Card.Title>{doctor.name}</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <FaEnvelope className={stylesDocSection.icons} />
                    {/* @ts-ignore */}
                    {doctor?.email || ''}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FaMobileAlt className={stylesDocSection.icons} />
                    {/* @ts-ignore */}
                    {doctor?.personalInformation?.phone || ''}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Gender: {/* @ts-ignore */}
                    {doctor?.personalInformation?.gender || ''}
                    {/* @ts-ignore */}
                    {doctor?.personalInformation?.gender === 'Male' && (
                      <FaMale className={stylesDocSection.icons} />
                    )}
                    {/* @ts-ignore */}
                    {doctor?.personalInformation?.gender === 'Female' && (
                      <FaFemale className={stylesDocSection.icons} />
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {/* @ts-ignore */}
                    Age: {doctor?.personalInformation?.age || ''}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {/* @ts-ignore */}
                    Occupation: {doctor?.personalInformation?.occupation || ''}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className={stylesDocSection.btns}>
                      <Button
                        variant="primary"
                        // @ts-ignore
                        onClick={() => editInfo(doctor.personalInformation._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        // @ts-ignore
                        onClick={() => deleteUser(doctor._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
      </div>
      <AddPatientForm
        role="patient"
        modalState={showAddForm}
        showForm={showForm}
        getPatients={getPatients}
      />
      <PersonalInformation
        userId={userId}
        role="patient"
        modalState={showEditForm}
        showForm={showEdit}
        getPatients={getPatients}
      />
    </>
  );
};

export default PatientSection;