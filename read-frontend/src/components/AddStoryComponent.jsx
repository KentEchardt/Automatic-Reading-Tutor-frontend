import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AddStoryComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [storyText, setStoryText] = useState('');
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};

    if (!title) {
      formIsValid = false;
      errors['title'] = 'Title is required';
    }

    if (!description) {
      formIsValid = false;
      errors['description'] = 'Description is required';
    }

    if (!difficulty) {
      formIsValid = false;
      errors['difficulty'] = 'Difficulty level is required';
    }

    if (!storyText) {
      formIsValid = false;
      errors['storyText'] = 'Story text is required';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      // You can add submission logic here
      alert('Story details are valid!');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center">Add New Story</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter story title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDifficulty" className="mt-3">
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Control
                as="select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                isInvalid={!!errors.difficulty}
              >
                <option value="">Select difficulty level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.difficulty}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formStoryText" className="mt-3">
              <Form.Label>Story Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter full story text"
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                isInvalid={!!errors.storyText}
              />
              <Form.Control.Feedback type="invalid">{errors.storyText}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Add Story
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStoryComponent;
