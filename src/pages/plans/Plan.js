import React from "react";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../../styles/Plan.module.css";
import { Container } from "react-bootstrap";

const Plan = (props) => {
  const {
    owner,
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
    
    <Container>
      <Row>
        
        <Col className="text-center mt-2">
          {plans_title && (
            <p className={`${styles.PlansTitle} text-center`}>{plans_title}</p>
          )}
        </Col>
        
      </Row>
      <Row className={`${styles.DescRow} d-flex mb-2`}>
        
          {plans_description && (
            <Col className={`${styles.PlansCol} text-center`}>
              {plans_description}
            </Col>
          )}
          {until && (
            <Col className={`${styles.PlansCol} ${styles.Until} text-center`}>
              until
            </Col>
          )}
          {plans_date && <Col className="text-center">{plans_date}</Col>}
        
      </Row>
      <hr className={styles.PlansDivider}></hr>
      </Container>
    
  );
};

export default Plan;
