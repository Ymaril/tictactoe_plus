import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card, Form, Input, Button, Error } from "./shared/AuthForms";
import { useAuth } from "src/index/shared/auth";
import api from "src/api";

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
        <Input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="password again"
        />
        <Button onClick={postSignup}>Sign Up</Button>
      </Form>
      {errors.map((error, i) => (
        <Error key={i}>{error}</Error>
      ))}
    </Card>
  );
}

export default SignupPage;
