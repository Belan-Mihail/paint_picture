import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" name="content" rows={7} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Greeting</Form.Label>
        <Form.Control as="input" name="greeting" rows={2} />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Main}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Main}`} type="submit">
        save
      </Button>
    </>
  );

  return <div>ProfileEditForm</div>;
};

export default ProfileEditForm;
