import React, {useState, useEffect} from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import AOS from "aos";
import "aos/dist/aos.css";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  /* 
    handles changes to form fields
  */
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  /* 
    initial AOS animation and chec current user profile id
  */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

   /* 
    used to send user data and update user password 
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6} data-aos="flip-down" data-aos-duration="1000">
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label id="newPasswordLabel">New password</Form.Label>
              <Form.Control
                aria-labelledby="newPasswordLabel"
                placeholder="new password"
                type="password"
                name="new_password1"
                value={new_password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label id="confirmPasswordLabel">Confirm password</Form.Label>
              <Form.Control
                aria-labelledby="confirmPasswordLabel"
                placeholder="confirm new password"
                type="password"
                name="new_password2"
                value={new_password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Main}`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Main}`}
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;
