import React, { useState } from "react";
import styles from "../../styles/PictureCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

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

  return <div>PictureCreateForm</div>;
};

export default PictureCreateForm;
