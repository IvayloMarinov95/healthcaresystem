import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setIsLoading } from '../../../../features/spinner/isLoading-slice';
import axios from 'axios';

interface Props {
  userId: string;
  modalState: boolean;
  showForm: () => void;
  getDoctors: () => void;
}

const PersonalInformation: React.FC<Props> = ({
  userId,
  modalState,
  showForm,
  getDoctors,
}) => {
  const [age, setAge] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
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

  const cancel = () => {
    setAge('');
    setPhone('');
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
      occupation,
      department,
    };

    await axios
      .patch(url, editData)
      .then((response) => {
        if (response?.data) {
          console.log('Success!');
          cancel();
          getDoctors();
        }
      })
      .catch((error) => console.log('error: ', error))
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
        <Form.Group controlId="occupation">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter occupation"
            value={occupation}
            onChange={handleOccupationChange}
          />
        </Form.Group>
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={handleDepartmentChange}
          />
        </Form.Group>
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
