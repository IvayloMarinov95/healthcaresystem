import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { setIsLoading } from '../../../features/spinner/isLoading-slice';
import axios from 'axios';
import { setUser } from '../../../features/user/user-slice';
import { useAppDispatch } from '../../../app/hooks';
import { setToast } from '../../../features/toast/toast-slice';

interface Props {
  openModal: boolean;
  closeModal: () => void;
}

const AdminAuthentication: React.FC<Props> = ({ closeModal, openModal }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = async () => {
    dispatch(setIsLoading(true));
    const url = 'http://localhost:5000/api/users/adminLogin';
    const loginData = {
      email,
      password,
    };
    await axios
      .post(url, loginData)
      .then((response) => {
        if (response?.data) {
          const tokenExpirationDate = new Date(
            new Date().getTime() + 1000 * 60 * 60
          );
          localStorage.setItem(
            'userData',
            JSON.stringify({
              userId: response.data.userId,
              role: response.data.role,
              token: response.data.token,
              expiration: tokenExpirationDate.toISOString(),
            })
          );
          dispatch(setUser(response.data));
          dispatch(
            // @ts-ignore
            setToast({ color: 'success', message: 'Successful log in!' })
          );
          closeModal();
        }
      })
      .catch((error) => {
        dispatch(
          setToast({
            // @ts-ignore
            color: 'danger',
            message: error?.response.data?.message || 'Something went wrong!',
          })
        );
        console.log('error: ', error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={openModal}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button onClick={() => handleClick()}>Sign In</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminAuthentication;
