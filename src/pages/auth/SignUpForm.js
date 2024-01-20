import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";

const SignUpForm = () => {
  return (
    <Row className={styles.FormRow}>
      <Col>
        <Container>
          <h1>Sign Up</h1>
          <Form>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
              />
            </Form.Group>


            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"

              />
            </Form.Group>

            <Button
              type="submit"
            >
              Sign up
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
