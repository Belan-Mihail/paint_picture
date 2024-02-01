import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import SignInPicture from "../../assets/signinpicture.png";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRedirect } from "../../hooks/useRedirect";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <Row className={styles.SignFormRow}>
        <Col data-aos="fade-left" data-aos-duration="2000">
          <Image
            className={styles.SignUpInPicture}
            src={SignInPicture}
            alt="sign in picture"
          />
        </Col>
      </Row>
      <Row className={styles.SignFormRow}>
        <Col data-aos="fade-right" data-aos-duration="2000">
          <Container>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control
                  className={styles.Input}
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

              <Form.Group controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Button
                type="submit"
                className={`${btnStyles.Button} ${btnStyles.Main}`}
              >
                Sign in
              </Button>
            </Form>
          </Container>
          <Container className="mt-3">
            <span>
              Don't have an account?
              <Link to="/signup" className={styles.LinkSpecial}>
                Sign up
              </Link>
              now!
            </span>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default SignInForm;
