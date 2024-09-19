import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { createStory, updateStory } from '../services/Stories'; // Import necessary services

const AddStoryComponent = ({ storyData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [storyText, setStoryText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Initialize form fields if storyData is provided (for updating)
  useEffect(() => {
    if (storyData) {
      setTitle(storyData.title);
      setDescription(storyData.description);
      setDifficulty(storyData.difficulty_level);
      setStoryText(storyData.fulltext);
    }
  }, [storyData]);

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

      if (imageFile) {
        formData.append('image', imageFile);
      }

      try {
        let response;
        if (storyData) {
          // Update the story
          response = await updateStory(storyData.id, formData);
        } else {
          // Create a new story
          response = await createStory(formData);
        }

        if (response) {
          alert(storyData ? 'Story updated successfully!' : 'Story created successfully!');
        } else {
          alert('An error occurred. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center">{storyData ? 'Update Story' : 'Add New Story'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter story title"
              />
              {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter story description"
              />
              {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
            </Form.Group>

            <Form.Group controlId="formDifficulty" className="mb-3">
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Control
                type="text"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                placeholder="Enter difficulty level (easy, medium, hard)"
              />
              {errors.difficulty && <span style={{ color: 'red' }}>{errors.difficulty}</span>}
            </Form.Group>

            <Form.Group controlId="formStoryText" className="mb-3">
              <Form.Label>Full Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="Enter full story text"
              />
              {errors.storyText && <span style={{ color: 'red' }}>{errors.storyText}</span>}
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
              {errors.imageFile && <span style={{ color: 'red' }}>{errors.imageFile}</span>}
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              {storyData ? 'Update Story' : 'Add Story'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStoryComponent;
