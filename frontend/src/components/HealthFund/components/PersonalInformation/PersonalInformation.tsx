import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAppDispatch } from '../../../../app/hooks';
import { setIsLoading } from '../../../../features/spinner/isLoading-slice';
import { setToast } from '../../../../features/toast/toast-slice';
import axios from 'axios';

interface Props {
  userId: string;
  role: string;
  modalState: boolean;
  showForm: () => void;
  getDoctors?: () => void;
  getPatients?: () => void;
}

const PersonalInformation: React.FC<Props> = ({
  userId,
  role,
  modalState,
  showForm,
  getDoctors,
  getPatients,
}) => {
  const [age, setAge] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleOccupationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOccupation(e.target.value);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };
  const handleMaleClicked = () => {
    setGender('Male');
  };

  const handleFemaleClicked = () => {
    setGender('Female');
  };

  const cancel = () => {
    setAge('');
    setPhone('');
    setGender('');
    setOccupation('');
    setDepartment('');
    showForm();
  };

  const editInformation = async () => {
    dispatch(setIsLoading(true));
    const url =
      'http://localhost:5000/api/users/updatePersonalInformation/' + userId;
    const editData = {
      age,
      phone,
      gender,
      occupation,
      department,
    };

    await axios
      .patch(url, editData)
      .then((response) => {
        if (response?.data) {
          dispatch(
            // @ts-ignore
            setToast({ color: 'success', message: 'Successfully edited.' })
          );
          console.log('Success!');
          cancel();
          if (role === 'doctor') {
            getDoctors?.();
          } else {
            getPatients?.();
          }
        }
      })
      .catch((error) => {
        dispatch(
          // @ts-ignore
          setToast({ color: 'danger', message: error.response.data.message })
        );
        console.log('error: ', error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalState}
      onHide={showForm}
      onEscapeKeyDown={showForm}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Doctor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="username">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter age"
            value={age}
            onChange={handleAgeChange}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Check
            type="checkbox"
            label="Male"
            inline
            value={gender}
            onChange={handleMaleClicked}
          ></Form.Check>
          <Form.Check
            type="checkbox"
            label="Female"
            inline
            value={gender}
            onChange={handleFemaleClicked}
          ></Form.Check>
        </Form.Group>
        <Form.Group controlId="occupation">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter occupation"
            value={occupation}
            onChange={handleOccupationChange}
          />
        </Form.Group>
        {role === 'doctor' && (
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={handleDepartmentChange}
            />
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={editInformation}>
          Add
        </Button>
        <Button variant="danger" onClick={cancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PersonalInformation;
