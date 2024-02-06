import React from "react";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../../styles/Plan.module.css";
import Container from "react-bootstrap/Container";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosRes } from "../../api/axiosDefaults";

const Plan = (props) => {
  const {
    id,
    owner,
    plans_title,
    plans_description,
    plans_date,
    until,
    updated_at,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/plans/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/plans/${id}/`);
      history.goBack();
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <small>{updated_at}</small>
      <Row>
        <Col className="text-center mt-2">
          {plans_title && (
            <p className={`${styles.PlansTitle} text-center`}>{plans_title}</p>
          )}
        </Col>

        {is_owner && (
          <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
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
