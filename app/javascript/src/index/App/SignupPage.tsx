import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "src/index/shared/auth";
import api from "src/api";
import {Alert, Button, Form} from "react-bootstrap";

function SignupPage() {
  const { token, signIn } = useAuth();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function postSignup() {
    api
      .post("/api/signup", {
        user: { email, password, password_confirmation: passwordConfirmation },
      })
      .then(result => signIn(result.headers.authorization, result.data))
      .catch(e => setErrors(e.response.data.errors));
  }

  if (token) {
    return <Redirect to="/" />;
  }

  return (
      <Form onSubmit={postSignup}>
        {errors.map((error, i) => (
            <Alert key={i} variant="danger">{error}</Alert>
        ))}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Подтверждение пароля</Form.Label>
          <Form.Control type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Регистрация
        </Button>
      </Form>
  );
}

export default SignupPage;
