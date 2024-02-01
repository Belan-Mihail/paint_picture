import React, { useState, useEffect } from "react";
import btnStyles from "../../styles/Button.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import appStyles from "../../App.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import AOS from "aos";
import "aos/dist/aos.css";


const PlanCreateForm = (props) => {
  const [errors, setErrors] = useState({});
  const { profile_id } = props

  const [planData, setPlanData] = useState({
    plans_title: "",
    plans_description: "",
    plans_date: "",
    until: false,
  });

  const { plans_title, plans_description, plans_date, until } = planData;

  const history = useHistory();

  const handleChange = (event) => {
    setPlanData({
      ...planData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("plans_title", plans_title);
    formData.append("plans_description", plans_description);
    formData.append("plans_date", plans_date);
    formData.append("until", until);

    try {
      await axiosReq.post("/plans/", formData);
        history.push(`/profiles/${profile_id}/`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Row>
      <Col className="py-2 mx-auto text-center mt-4" md={6} data-aos="flip-down" data-aos-duration="1000">
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label>Plan Title</Form.Label>
              <Form.Control
                name="plans_title"
                type="text"
                value={plans_title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.plans_title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Plan Description</Form.Label>
              <Form.Control
                name="plans_description"
                type="text"
                value={plans_description}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.plans_description?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Plan Date</Form.Label>
              <Form.Control
                name="plans_date"
                type="date"
                value={plans_date}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.plans_date?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Add until</Form.Label>
              <Form.Control
                name="until"
                as="select"
                value={until}
                onChange={handleChange}
              >
                <option>false</option>
                <option>true</option>
              </Form.Control>
            </Form.Group>
            {errors.until?.map((message, idx) => (
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
            <Button
              className={`${btnStyles.Button} ${btnStyles.Main}`}
              type="submit"
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default PlanCreateForm;
