import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import SignUpPicture from '../../assets/signuppicture.png'

const SignUpForm = () => {

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  return (
    <>
    <Row className={styles.SignFormRow}>
      <Col>
      <Image
      className={styles.SignUpInPicture} 
      src={SignUpPicture}
      alt="sign up picture"
      />
      </Col>
    </Row>
    <Row className={styles.SignFormRow}>
      <Col>
        <Container>
          <h1>Sign Up</h1>
          <Form>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
              />
            </Form.Group>

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
              />
            </Form.Group>


            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
              />
            </Form.Group>

            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Main}`}
            >
              Sign up
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
    </>
  );
};

export default SignUpForm;
