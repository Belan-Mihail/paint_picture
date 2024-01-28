import React from 'react'

const UsernameForm = () => {
    return (
        <Row>
          <Col className="py-2 mx-auto text-center" md={6}>
            <Container className={appStyles.Content}>
              <Form onSubmit={() => {}} className="my-2">
                <Form.Group>
                  <Form.Label>Change username</Form.Label>
                  <Form.Control
                    placeholder="username"
                    type="text"
                  />
                </Form.Group>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Main}`}
                  onClick={() => {}}
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

export default UsernameForm