import React from "react";
import { Button, Modal } from "react-bootstrap";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

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
}) => (
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
          {toggle === "signIn" ? "Sign In" : "Sign Up"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {toggle === "signIn" && (
          <SignIn
            email={email}
            password={password}
            handleModalContentChange={() => handleModalContentChange("signUp")}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
          />
        )}
        {toggle === "signUp" && (
          <SignUp
            username={username}
            email={email}
            password={password}
            handleModalContentChange={() => handleModalContentChange("signIn")}
            handleUsernameChange={handleUsernameChange}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => console.log()}>
          {toggle === "signIn" ? "Sign In" : "Sign Up"}
        </Button>
        <Button variant="danger" onClick={handleHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

export default AuthenticationModal;
