import React, { useState, useEffect } from "react";
import Row  from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import SignUpPicture from '../../assets/signuppicture.png'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;
  useRedirect("loggedIn");

  const [errors, setErrors] = useState({});

  const history = useHistory();

  /* 
    handles changes to form fields
  */
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  }

  /* 
    used to create new user in database
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  /* 
    initial AOS animation 
  */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
    <Row className={styles.SignFormRow}>
      <Col data-aos="fade-right" data-aos-duration="2000">
      <Image
      className={styles.SignUpInPicture} 
      src={SignUpPicture}
      alt="sign up picture"
      />
      </Col>
    </Row>
    <Row className={styles.SignFormRow}>
      <Col data-aos="fade-left" data-aos-duration="2000">
        <Container>
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none" id="usernameLabel">username</Form.Label>
              <Form.Control
                className={styles.Input}
                aria-labelledby="usernameLabel"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none" id="password1Label">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                aria-labelledby="password1Label"
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}


            <Form.Group controlId="password2">
              <Form.Label className="d-none" id="password2Label">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                aria-labelledby="password2Label"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Main}`}
            >
              Sign up
            </Button>
          </Form>
        </Container>
        <Container className="mt-3">
        <span>Already have an account?
        <Link to="/signin" className={styles.LinkSpecial}>
            Sign in
          </Link>
        </span>
        </Container>
      </Col>
    </Row>
    </>
  );
};

export default SignUpForm;
