import React from "react";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const Plan = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    plans_title,
    plans_description,
    plans_date,
    until,
    updated_at,
    setProfilePlans,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <>
      <Row>
        <Col className="text-center mt-2">
          {plans_title && <p className="text-center">{plans_title}</p>}
        </Col>
      </Row>
      <Row className="mb-2">
        {plans_description && <Col xs={8} className="text-center">{plans_description}</Col>}
        {until && <Col className="text-center">until</Col>}
        {plans_date && <Col className="text-center">{plans_date}</Col>}
      </Row>
    </>
  );
};

export default Plan;
