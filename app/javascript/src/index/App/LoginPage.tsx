import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, Form, Input, Button, Error } from "./shared/AuthForms";
import { useAuth } from "src/index/shared/auth";
import api from "src/api";

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
    <Card>
      <Form>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
      {errors.map((error, i) => (
        <Error key={i}>{error}</Error>
      ))}
    </Card>
  );
}

export default LoginPage;