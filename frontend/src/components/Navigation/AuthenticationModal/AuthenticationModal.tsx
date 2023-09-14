import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import axios from 'axios';
import { setUser } from '../../../features/user/user-slice';
import { setIsLoading } from '../../../features/spinner/isLoading-slice';

interface Props {
  openModal: boolean;
  handleHide: () => void;
  toggle: string;
  username: string;
  email: string;
  password: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModalContentChange: (text: string) => void;
}

const AuthenticationModal: React.FC<Props> = ({
  openModal,
  handleHide,
  toggle,
  username,
  email,
  password,
  handleUsernameChange,
  handleEmailChange,
  handlePasswordChange,
  handleModalContentChange,
}) => {
  const roles = useAppSelector((state: RootState) => state.roles.value);
  const dispatch = useAppDispatch();

  const handleClick = (toggle: string) => {
    if (toggle === 'signIn') {
      signIn();
    }
    if (toggle === 'signUp') {
      signUp();
    }
  };

  const signIn = async () => {
    dispatch(setIsLoading(true));
    const url = 'http://localhost:5000/api/users/login';
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
        }
        handleHide();
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  const signUp = async () => {
    dispatch(setIsLoading(true));
    const url = 'http://localhost:5000/api/users/signup';
    const signUpData = {
      name: username,
      email,
      password,
      role: roles.filter((item) => item.role === 'patient')[0]?._id,
    };

    await axios
      .post(url, signUpData)
      .then((response) => {
        if (response?.data) {
          const tokenExpirationDate = new Date(
            new Date().getTime() + 1000 * 60 * 60
          );
          dispatch(setUser(response.data));
          localStorage.setItem(
            'userData',
            JSON.stringify({
              userId: response.data.userId,
              token: response.data.token,
              expiration: tokenExpirationDate.toISOString(),
            })
          );
          handleHide();
        }
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={openModal}
        onHide={handleHide}
        onEscapeKeyDown={handleHide}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {toggle === 'signIn' ? 'Sign In' : 'Sign Up'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {toggle === 'signIn' && (
            <SignIn
              email={email}
              password={password}
              handleModalContentChange={() =>
                handleModalContentChange('signUp')
              }
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
            />
          )}
          {toggle === 'signUp' && (
            <SignUp
              username={username}
              email={email}
              password={password}
              handleModalContentChange={() =>
                handleModalContentChange('signIn')
              }
              handleUsernameChange={handleUsernameChange}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClick(toggle)}>
            {toggle === 'signIn' ? 'Sign In' : 'Sign Up'}
          </Button>
          <Button variant="danger" onClick={handleHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuthenticationModal;
