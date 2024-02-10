import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../context/CurrentUserContext";
import AOS from "aos";
import "aos/dist/aos.css";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
    greeting: "",
  });
  const { name, content, image, greeting } = profileData;

  const [errors, setErrors] = useState({});

  /* 
    initial AOS animation and get profiles data based on its id
  */
  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image, greeting } = data;
          setProfileData({ name, content, image, greeting });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
    AOS.init();
    AOS.refresh();
  }, [currentUser, history, id]);

  /* 
    handles changes to form fields
  */
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

   /* 
    used to send user data and update profiles data based on its id 
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    formData.append("greeting", greeting);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label id="bioLabel">Bio</Form.Label>
        <Form.Control
          aria-labelledby="bioLabel"
          as="textarea"
          rows={7}
          onChange={handleChange}
          name="content"
          value={content}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label id="greetingLabel">Greeting</Form.Label>
        <Form.Control
          aria-labelledby="greetingLabel"
          as="input"
          name="greeting"
          value={greeting}
          rows={2}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.greeting?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label id="nicknameLabel">Nickname</Form.Label>
        <Form.Control
          aria-labelledby="nicknameLabel"
          as="input"
          name="name"
          value={name}
          rows={1}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Main}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Main}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center mt-2" md={7} lg={6} data-aos="flip-left" data-aos-duration="1000">
          <Container className={appStyles.Content}>
            <Form.Group>
              {image && (
                <figure>
                  <Image className={appStyles.Image} src={image} fluid alt="avatar"/>
                </figure>
              )}

              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Main} btn my-auto`}
                  htmlFor="image-upload"
                  id="imageLabel"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                aria-labelledby="imageLabel"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none mt-2">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center" data-aos="flip-right" data-aos-duration="1000">
          <Container className={`${appStyles.Content} mt-2`}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
