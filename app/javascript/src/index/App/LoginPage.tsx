import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "src/index/shared/auth";
import api from "src/api";
import {Alert, Button, Form} from "react-bootstrap";

function LoginPage() {
  const { token, signIn } = useAuth();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function postLogin() {
    api
      .post("/api/login", { user: { email, password } })
      .then((result) => signIn(result.headers.authorization, result.data))
      .catch((e) => setErrors(e.response.data.errors));
  }

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <Form onSubmit={postLogin}>
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
      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  );
}

export default LoginPage;
