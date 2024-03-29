import styles from "../../styles/CommentCreateEditForm.module.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import btnStyles from "../../styles/Button.module.css";
import Alert from "react-bootstrap/Alert";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { picture, setPicture, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  /* 
    handles changes to form fields
  */
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /* 
    used to send user data and create new comment 
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        picture,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPicture((prevPicture) => ({
        results: [
          {
            ...prevPicture.results[0],
            comments_count: prevPicture.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Label className="d-none" id="commentLabel">Comment</Form.Label>
          <Form.Control
            className={styles.Form}
            aria-labelledby="commentLabel"
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <button
        className={`${btnStyles.Button} ${btnStyles.CommentButton} btn d-block ml-auto`}
        type="submit"
      >
        add comment
      </button>
    </Form>
  );
}

export default CommentCreateForm;
