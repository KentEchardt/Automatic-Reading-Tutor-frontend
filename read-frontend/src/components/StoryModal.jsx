import {React, useState, useEffect} from 'react'
import {Modal, Button, Container, Row} from 'react-bootstrap'

//Component for displaying story details in a Modal
const StoryModal = ({ story, onClose }) => {
    if (!story) return null;
  
    return (
      <Modal show={true} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{story.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <h5>Author: {story.author}</h5>
                <p>{story.description}</p>
                {/* Add other details like story genre, reading level, etc. */}
              </Col>
              {story.image && (
                <Col>
                  <img
                    src={story.image}
                    alt={story.title}
                    className="img-fluid"
                  />
                </Col>
              )}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default StoryModal;