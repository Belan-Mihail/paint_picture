import React, { useState } from "react";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import btnStyles from "../../styles/Button.module.css";

import { axiosRes } from "../../api/axiosDefaults";

const WallitemEditForm = (props) => {
  const { id, message, setShowEditForm, setProfileWallItems } = props;

  const [messageData, setMessageData] = useState(message);

  /* 
    handles changes to form fields
  */
  const handleChange = (event) => {
    setMessageData(event.target.value);
  };

   /* 
    used to send user data and update wallitem based on its id 
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/wallitems/${id}/`, { message: messageData });
      setProfileWallItems((prevprofileWallItems) => ({
        ...prevprofileWallItems,
        results: prevprofileWallItems.results.map((wallItem) => {
          return wallItem.id === id
            ? {
                ...wallItem,
                message: messageData,
                updated_at: "now",
              }
            : wallItem;
        }),
      }));
    } catch (err) {
      setErrors(err);
    }
    setShowEditForm(false);
  };

  const [errors, setErrors] = useState({});

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          rows={2}
          value={messageData}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.messageData?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <div className="text-right">
        <button
          className={`${btnStyles.Button} ${btnStyles.CommentButton}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={`${btnStyles.Button} ${btnStyles.SaveButton} mr-1 ml-1`}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
};

export default WallitemEditForm;
