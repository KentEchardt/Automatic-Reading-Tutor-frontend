import React, { useState } from 'react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { FaInfo, FaBook, FaPlus } from 'react-icons/fa'; // Importing the icons

const StoryCard = ({ story }) => {
  const [hovered, setHovered] = useState(false); // State to manage hover

  return (
    <Card
      style={{ 
        position: 'relative', 
        borderRadius: '15px', 
        borderColor:'black',
        overflow: 'hidden', 
        height: '100%', 
        width: 'auto',
        margin: '0 0.5rem',  
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={story.image}
        alt={story.title}
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
      {/* <Card.Body style={{ padding: '0.75rem', height: '60%' }}>
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
      </Card.Body> */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <div style={{ marginBottom: '4cqh', cursor: 'pointer' }}>
            <FaBook size={24} />
            <span style={{ marginLeft: '8px' }}>Read Story</span>
          </div>
          <div style={{ cursor: 'pointer' }}>
            <FaPlus size={24} />
            <span style={{ marginLeft: '8px' }}>Add to My List</span>
          </div>
          
        </div>
      )}
    </Card>
  );
};

export default StoryCard;
