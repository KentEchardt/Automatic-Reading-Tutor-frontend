import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { FaInfo, FaBook, FaPlus } from 'react-icons/fa'; // Importing the icons
import { useNavigate } from 'react-router-dom';
import { getStoryCover } from '../services/Stories';

// Component for displaying Story card and user options for interacting with Stories
const StoryCard = ({ story }) => {
  const [hovered, setHovered] = useState(false); // State to manage hover
  const [storyTitle, setStoryTitle] = useState('') 
  const [storyImageData, setStoryImageData] = useState(null)
  const [contentType, setContentType] = useState(null)

  const navigate = useNavigate();

  // Fetch story cover data
  useEffect(() => {
    if (story && story.id) {
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
    }
  }, [story]);

  const base64ToImage = (base64String, contentType) => {
    return `data:${contentType};base64,${base64String}`;
  };

  const handleClick = () => {
    if (story) navigate(`/story/${story.id}`);
  };

  if (!story) {
    return (
      <Card
        style={{ 
          position: 'relative', 
          borderRadius: '15px', 
          borderColor: 'black',
          overflow: 'hidden', 
          height: '100%', 
          width: 'auto',
          margin: '0 0.5rem',  
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p>No Story Data</p>
      </Card>
    );
  }

  return (
    <Card
      style={{ 
        position: 'relative', 
        borderRadius: '15px', 
        borderColor: 'black',
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
        alt={storyTitle || 'No Title'}
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
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
          <div className="mb-3 cursor-pointer" >
            <h5>{storyTitle}</h5>
          </div>
          <div style={{ marginBottom: '2cqh', cursor: 'pointer' }}>
            <FaBook size={24} />
            <span style={{ marginLeft: '8px' }} onClick={handleClick}>Read Story</span>
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
