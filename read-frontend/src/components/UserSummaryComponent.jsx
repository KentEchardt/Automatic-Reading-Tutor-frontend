import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StoryCircle from './StoryCircle';
import { getReadingLevel, getUsername } from '../services/users';
import { getMostRecentStory, getTotalStoriesRead } from '../services/readingsession';

//Component for displaying summary user data in circles on main User screen
const UserSummaryComponent = () => {

  const [username, setUsername] = useState('')
  const [readingLevel, setReadingLevel] = useState(0)
  const [totalStoriesRead, setTotalStoriesRead] = useState(0)
  const [mostRecentStory, setMostRecentStory] = useState(null)

  // Fetch username
  useEffect(() => {
  const fetchUsername = async () => {
    try {
      const response = await getUsername();
      setUsername(response);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  fetchUsername();
}, []);

  // Fetch reading level
  useEffect(() => {
    const fetchReadingLevel = async () => {
      try {
        const response = await getReadingLevel();
        setReadingLevel(response);
      } catch (error) {
        console.error('Error fetching reading level:', error);
      }
    };
  
    fetchReadingLevel();
  }, []);


    // Fetch total stories read
  useEffect(() => {
    const fetchTotalStoriesRead = async () => {
      try {
        const response = await getTotalStoriesRead();
        setTotalStoriesRead(response);
      } catch (error) {
        console.error('Error fetching total stories read:', error);
      }
    };
  
    fetchTotalStoriesRead();
  }, []);

    // Fetch most recent story read
    useEffect(() => {
      const fetchMostRecentStory = async () => {
        try {
          const response = await getMostRecentStory();
          setMostRecentStory(response.story_id);
        } catch (error) {
          console.error('Error fetching most recent story:', error);
          setMostRecentStory(null);
        }
      };
    
      fetchMostRecentStory();
    }, []);
  


  return (
    <Container className="text-center">
        <Row style={{ marginBottom:'10cqh'}}>
           <h2 >{username}</h2> 
        </Row>
      
      <Row className="justify-content-center align-items-end">
        <Col xs={4} className="d-flex justify-content-center">
          <div
            className="detail-circle"
            style={{
              width: '30cqh',
              height: '30cqh',
              borderRadius: '50%',
              backgroundColor: '#28a745', //#2EC51F
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
          >
            <p style={{ fontSize: '1rem' }}>Reading Level: {readingLevel}</p>
          </div>
        </Col>
        <Col xs={4} className="d-flex justify-content-center" style={{ transform: 'translateY(-10%)' }}>
          <StoryCircle story_id={mostRecentStory} />
        </Col>
        <Col xs={4} className="d-flex justify-content-center">
          <div
            className="detail-circle"
            style={{
              width: '30cqh',
              height: '30cqh',
              borderRadius: '50%',
              backgroundColor: 'mediumvioletred',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
          >
            <p style={{ fontSize: '1rem' }}>Stories Read: {totalStoriesRead}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSummaryComponent;
