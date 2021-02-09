import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  email: string;
  password: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignIn: React.FC<Props> = ({
  email,
  password,
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
        type="passwaord"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
    </Form.Group>
  </>
);

export default SignIn;
