import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../Navigation.module.scss";

interface Props {
  username: string;
  email: string;
  password: string;
  handleModalContentChange: () => void;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUp: React.FC<Props> = ({
  username,
  email,
  password,
  handleModalContentChange,
  handleEmailChange,
  handlePasswordChange,
  handleUsernameChange,
}) => (
  <>
    <Form.Group controlId="email">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={handleUsernameChange}
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
        type="passwaord"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
    </Form.Group>
    <div className={styles.signUp}>
      <label>You already have a registration?</label>
      <div>
        <Button
          variant="dark"
          size="sm"
          onClick={() => handleModalContentChange()}
        >
          Sign In
        </Button>
      </div>
    </div>
  </>
);

export default SignUp;
