import React, { useState } from "react";
import styles from "../../styles/PictureCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const PictureCreateForm = () => {
  const [errors, setErrors] = useState({});

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={6} name="description" />
      </Form.Group>
      <Form.Group controlId="picture_category">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="picture_category">
          <option>other</option>
          <option>landscapes</option>
          <option>animals</option>
          <option>plants</option>
          <option>abstraction</option>
        </Form.Control>
      </Form.Group>

      <Button className={`${btnStyles.Button} ${btnStyles.Main}`}>
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Main}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              <Form.File
                id="image-upload"
                accept="image/*"
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PictureCreateForm;
