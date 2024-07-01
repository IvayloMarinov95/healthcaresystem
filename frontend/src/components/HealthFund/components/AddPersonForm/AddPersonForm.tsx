import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setIsLoading } from '../../../../features/spinner/isLoading-slice';
import { setToast } from '../../../../features/toast/toast-slice';
import { RootState } from '../../../../app/store';
import axios from 'axios';

interface Props {
  role: string;
  modalState: boolean;
  showForm: () => void;
  getPatients?: () => void;
  getDoctors?: () => void;
}

const AddDoctorForm: React.FC<Props> = ({
  role,
  modalState,
  showForm,
  getPatients,
  getDoctors,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state: RootState) => state.roles.value);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const cancel = () => {
    setName('');
    setEmail('');
    setPassword('');
    showForm();
  };

  const addPerson = async () => {
    dispatch(setIsLoading(true));
    const personRoleId =
      role === 'patient'
        ? roles.filter((item) => item.role === 'patient')[0]?._id
        : roles.filter((item) => item.role === 'doctor')[0]?._id;
    const url = 'http://localhost:5000/api/users/signup';
    const signUpData = {
      name,
      email,
      password,
      role: personRoleId,
    };

    await axios
      .post(url, signUpData)
      .then((response) => {
        if (response?.data) {
          const msg =
            role === 'patient'
              ? 'Patient sucessfuly added.'
              : 'Doctor successfuly added.';
          dispatch(
            // @ts-ignore
            setToast({ color: 'success', message: msg })
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
          setToast({
            // @ts-ignore
            color: 'danger',
            message: error?.response?.data?.message || 'Something went wrong!',
          })
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
        <Modal.Title id="contained-modal-title-vcenter">
          {role === 'doctor' ? 'Add Doctor' : 'Add Patient'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="username">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={addPerson}>
          Add
        </Button>
        <Button variant="danger" onClick={cancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDoctorForm;
