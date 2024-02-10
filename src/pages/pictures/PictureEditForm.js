import React, { useRef, useState, useEffect } from "react";
import styles from "../../styles/PictureCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import appStyles from "../../App.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import "aos/dist/aos.css";

const PictureEditForm = () => {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
    picture_category: "",
  });
  const { title, description, image, picture_category } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  /* 
    initial AOS animation and get picture data based on its id 
  */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/pictures/${id}/`);
        const { title, description, image, is_owner, picture_category } = data;
        is_owner
          ? setPostData({ title, description, image, picture_category })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
    AOS.init();
    AOS.refresh();
  }, [history, id]);

  /* 
    handles changes to form fields
  */
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  /* 
    handles changes image
  */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /* 
    used to send user data and update picture based on its id 
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("picture_category", picture_category);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/pictures/${id}/`, formData);
      history.push(`/pictures/${id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label id="titleLabel">Title</Form.Label>
        <Form.Control
        aria-labelledby="titleLabel"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label id="descriptionLabel">Description</Form.Label>
        <Form.Control
          as="textarea"
          aria-labelledby="descriptionLabel"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="picture_category">
        <Form.Label aria-labelledby="categoryLabel">Category</Form.Label>
        <Form.Control
          id="categoryLabel"
          as="select"
          name="picture_category"
          value={picture_category}
          onChange={handleChange}
        >
          <option>other</option>
          <option>landscapes</option>
          <option>animals</option>
          <option>plants</option>
          <option>abstraction</option>
        </Form.Control>
      </Form.Group>
      {errors?.picture_category?.map((message, idx) => (
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
        edit
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8} data-aos="fade-right" data-aos-duration="1000">
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded alt="picture" />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Main}`}
                      htmlFor="image-upload"
                      id="imageLabel"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                  id="imageLabel"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}
              <Form.File
                aria-labelledby="imageLabel"
                id="image-upload"
                accept="image/*"
                ref={imageInput}
                onChange={handleChangeImage}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2" data-aos="fade-left" data-aos-duration="1000">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PictureEditForm;
