import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import btnStyles from "../../styles/Button.module.css";

import Avatar from "../../components/Avatar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import "aos/dist/aos.css";

function WallitemCreateForm(props) {
  const { profileImage, profile_id, setProfileWallItems, current_profile } =
    props;
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  console.log(current_profile);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("message", message);
    formData.append("profile", current_profile);

    try {
      await axiosReq.post("/wallitems/", formData);
      history.push(`/`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        console.log(err.response?.data);
      }
    }
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Form
      className="mt-2"
      onSubmit={handleSubmit}
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            placeholder="my message..."
            as="textarea"
            value={message}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${btnStyles.Button} ${btnStyles.CommentButton} btn d-block ml-auto`}
        type="submit"
      >
        add message
      </button>
    </Form>
  );
}

export default WallitemCreateForm;
