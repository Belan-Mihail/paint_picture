import React, {usestate} from 'react'

const PlanCreateForm = () => {

    const [errors, setErrors] = useState({});

  const [planData, setPlanData] = useState({
    plans_title: "",
    plans_description: "",
    plans_date: "",
    until: false,
  });
  const { plans_title, plans_description, plans_date, until } = planData;


  return (
    <Row>
      <Col className="py-2 mx-auto text-center mt-4" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={() => {}} className="my-2">
            <Form.Group>
              <Form.Label>Plan Title</Form.Label>
              <Form.Control
                placeholder="title"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Plan Description</Form.Label>
              <Form.Control
                placeholder="description"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Plan Date</Form.Label>
              <Form.Control
                placeholder="date"
                type="date"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add until</Form.Label>
              <Form.Control
                placeholder="until"
                type="text"
              />
            </Form.Group>

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
  )
}

export default PlanCreateForm