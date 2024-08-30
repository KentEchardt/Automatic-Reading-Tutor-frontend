import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { FaInfo, FaBook, FaPlus } from 'react-icons/fa'; // Importing the icons
import { useNavigate } from 'react-router-dom';
import { getStoryCover } from '../services/Stories';

//Component for displaying Story card and user options for interacting with Stories
const StoryCard = ({ story }) => {
  
  const [hovered, setHovered] = useState(false); // State to manage hover
  const [storyTitle, setStoryTitle] = useState('') 
  const [storyImageData, setStoryImageData] = useState(null)
  const [contentType, setContentType] = useState(null)

  const navigate = useNavigate();

  // Fetch story listings data
useEffect(() => {
  const fetchStoryCover = async () => {
    try {
      const response = await getStoryCover(story.id);
      setStoryImageData(response.image_data);
      setStoryTitle(response.title);
      setContentType(response.contentType);
    } catch (error) {
      console.error('Error fetching story cover:', error);
    }
  };

  fetchStoryCover();
}, []);


// Function to convert base64 string to image URL
const base64ToImage = (base64String, contentType) => {
  return `data:${contentType};base64,${base64String}`;
};

  const handleClick = () => {
    navigate(`/story/${story.id}`);
  };


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
         src={base64ToImage(storyImageData, contentType)}
         alt={storyTitle}
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
      {/* Originally had text in bottom half - still a viable option */}
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
      
      {/* Display interaction options if user hovers over the card */}
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
            <span style={{ marginLeft: '8px' }} onClick={handleClick} >Read Story</span>
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
