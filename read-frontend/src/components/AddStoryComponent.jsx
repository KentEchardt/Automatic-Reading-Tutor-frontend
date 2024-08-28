import {React, useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { createStory } from '../services/Stories.js'; // Import createStory function

const AddStoryComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [storyText, setStoryText] = useState('');
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null); // State for image file

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

    // Validate image file type (optional)
    if (imageFile && !/\.(jpg|jpeg|png)$/i.test(imageFile.name)) {
      formIsValid = false;
      errors['imageFile'] = 'Invalid image file. Please upload a JPG, JPEG, or PNG.';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('difficulty_level', difficulty);
      formData.append('fulltext', storyText);

      // Append image file if available
      if (imageFile) {
        formData.append('image', imageFile);
      }

      try {
        const response = await createStory(formData); // Use createStory function
        if (response) {
          alert('Story created successfully!');
          // Clear form data after successful submission
          setTitle('');
          setDescription('');
          setDifficulty('');
          setStoryText('');
          setImageFile(null);
        } else {
          console.error('Error creating story:', response.data);
          alert('An error occurred. Please try again.');
        }
      } catch (error) {
        console.error('Error creating story:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Access the first selected file
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
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {errors.difficulty}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {errors.storyText}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formImage" className="mt-3">
              <Form.Label>Story Cover Image</Form.Label>
              <InputGroup>
                <FormControl type="file" onChange={handleImageChange} isInvalid={!!errors.imageFile} />
                <Form.Control.Feedback type="invalid">
                  {errors.imageFile}
                </Form.Control.Feedback>
              </InputGroup>
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