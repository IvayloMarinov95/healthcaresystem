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
import AddDoctorForm from '../AddPersonForm/AddPersonForm';
import stylesDocSection from './DoctorsSection.module.scss';
import { setIsLoading } from '../../../../features/spinner/isLoading-slice';
import axios from 'axios';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import { useAppDispatch } from '../../../../app/hooks';
import { setToast } from '../../../../features/toast/toast-slice';

interface Props {
  doctors: Array<object>;
  getDoctors: () => void;
}

const DoctorsSection: React.FC<Props> = ({ doctors, getDoctors }) => {
  const [filteredList, setFilteredList] = useState<Array<object>>([]);
  const [input, setInput] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (doctors) {
      setFilteredList(doctors);
    }
  }, [doctors]);

  useEffect(() => {
    if (input) {
      const filter = doctors?.filter((item) =>
        // @ts-ignore
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredList(filter);
    } else {
      setFilteredList(doctors);
    }
  }, [input, doctors]);

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
      .then(() => {
        dispatch(
          // @ts-ignore
          setToast({ color: 'success', message: 'Deleted successfully.' })
        );
        getDoctors();
      })
      .catch((error) => {
        dispatch(
          // @ts-ignore
          setToast({ color: 'danger', message: error.response.data.message })
        );
        console.log('error: ', error);
      })
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
                <div className={stylesDocSection.title}>
                  {/* @ts-ignore */}
                  <Card.Title>{doctor.name}</Card.Title>
                  <img
                    src={`http://localhost:5000/${
                      // @ts-ignore
                      doctor?.personalInformation?.photo || ''
                    }`}
                    alt=""
                    className={stylesDocSection.img}
                  />
                </div>
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
                    {/* @ts-ignore */}
                    Department: {doctor?.personalInformation?.department || ''}
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
      <AddDoctorForm
        role="doctor"
        modalState={showAddForm}
        showForm={showForm}
        getDoctors={getDoctors}
      />
      <PersonalInformation
        userId={userId}
        role="doctor"
        modalState={showEditForm}
        showForm={showEdit}
        getDoctors={getDoctors}
      />
    </>
  );
};

export default DoctorsSection;
