import React from 'react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';

const StoryCard = ({ story }) => {
    return (
      <Card style={{ 
        borderRadius: '15px', 
        overflow: 'hidden', 
        height: '100%', 
        width: '18%',  // Adjust the width to fit five cards in a row
        margin: '0 0.5rem',  // Add some margin between cards
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
      }}>
        <Image
          src={story.image}
          alt={story.title}
          style={{ height: '40%', width: '100%', objectFit: 'cover' }}
        />
        <Card.Body style={{ padding: '0.75rem', height: '60%' }}>
          <Container fluid>
            <Row>
              <Col md={8}>
                <h6 style={{ fontSize: '0.9rem' }}>{story.title}</h6>
                <p style={{ fontSize: '0.75rem' }}>{story.description}</p>
              </Col>
              <Col md={4} className="d-flex align-items-center justify-content-center">
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}
                >
                  {story.difficulty.charAt(0).toUpperCase() + story.difficulty.slice(1)}
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  };

export default StoryCard;
