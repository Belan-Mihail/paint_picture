import React from 'react'


import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UserPasswordForm = () => {
    return (
        <Row>
          <Col className="py-2 mx-auto text-center" md={6}>
            <Container className={appStyles.Content}>
              <Form onSubmit={() => {}}>
                <Form.Group>
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    placeholder="new password"
                    type="password"
                    name="new_password1"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    placeholder="confirm new password"
                    type="password"
                    name="new_password2"
                  />
                </Form.Group>

                <Button
                  className={`${btnStyles.Button} ${btnStyles.Main}`}
                  onClick={() => {}}
                >
                  cancel
                </Button>
                <Button
                  type="submit"
                  className={`${btnStyles.Button} ${btnStyles.Main}`}
                >
                  save
                </Button>
              </Form>
            </Container>
          </Col>
        </Row>
      );
}

export default UserPasswordForm