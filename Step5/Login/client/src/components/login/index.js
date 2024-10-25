import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { login } from "../../api";

function Login({ onLoginSuccessful }) {
  const [email_text, setEmail] = useState("");
  const [password_text, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();
    setHasError(false);
    const loginResult = await login({ email_text, password_text });
    if (loginResult.statusCode === 200){
      const { name, token } = loginResult;
      // Save user IDs on local storage
      localStorage.setItem("name", name);
      localStorage.setItem("token", token);
      onLoginSuccessful();
    }
    else setHasError(true);
  };

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header as="h1">Login</Card.Header>
        <Card.Body>
          <Form className="w-100" onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={onEmailChange}
                value={email_text}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={onPasswordChange}
                value={password_text}
              />
            </Form.Group>
            {hasError && (
              <Alert variant={"danger"}>
                The email address and password you entered don't match any
                account. Please try again.
              </Alert>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
