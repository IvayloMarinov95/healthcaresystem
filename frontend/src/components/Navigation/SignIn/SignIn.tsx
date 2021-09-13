import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../Navigation.module.scss";

interface Props {
  email: string;
  password: string;
  handleModalContentChange: () => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignIn: React.FC<Props> = ({
  email,
  password,
  handleModalContentChange,
  handleEmailChange,
  handlePasswordChange,
}) => (
  <>
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
    <div className={styles.signUp}>
      <label>If you don't have a registration</label>
      <div>
        <Button
          variant="dark"
          size="sm"
          onClick={() => handleModalContentChange()}
        >
          Sign Up
        </Button>
      </div>
    </div>
  </>
);

export default SignIn;
