import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StoryCircle from './StoryCircle';
import { getReadingLevel, getUsername } from '../services/users';
import { getMostRecentStory, getTotalStoriesRead } from '../services/readingsession';

const UserSummaryComponent = () => {
  const [username, setUsername] = useState('');
  const [readingLevel, setReadingLevel] = useState(0);
  const [totalStoriesRead, setTotalStoriesRead] = useState(0);
  const [mostRecentStory, setMostRecentStory] = useState(null);
  const [totalStories, setTotalStories] = useState(0)

  // Convert reading level to letter grade
  const getLetterGrade = (level) => {
    if (level < 100) return 'D';
    if (level < 200) return 'C';
    if (level < 300) return 'B';
    if (level < 400) return 'A';
    if (level < 500) return 'S';
    return 'D';
  };

  // Calculate progress to the next level
  const getProgressToNextLevel = (level) => {
    let min = 0, max = 100;

    if (level < 100) {
      min = 0;
      max = 100;
    } else if (level < 200) {
      min = 100;
      max = 200;
    } else if (level < 300) {
      min = 200;
      max = 300;
    } else if (level < 400) {
      min = 300;
      max = 400;
    } else if (level < 500) {
      min = 400;
      max = 500;
    }

    return ((level - min) / (max - min)) * 100;
  };

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

  useEffect(() => {
    const fetchTotalStoriesRead = async () => {
      try {
        const response = await getTotalStoriesRead();
        setTotalStoriesRead(response.total_stories_read);
        setTotalStories(response.total_stories_count)
      } catch (error) {
        console.error('Error fetching total stories read:', error);
      }
    };

    fetchTotalStoriesRead();
  }, []);

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
      <Row style={{ marginBottom: '10cqh' }}>
        {/* <h2>{username}</h2> */}
      </Row>

      <Row className="justify-content-center align-items-end">
        <Col xs={4} className="d-flex justify-content-center">
        <div
    className="detail-circle"
    style={{
      width: '30cqh',
      height: '30cqh',
      borderRadius: '50%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'green'
    }}
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 36 36"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'rotate(-90deg)', // Rotate to start progress from the top
      }}
    >
      <circle
        cx="18"
        cy="18"
        r="15.915"
        fill="none"
        stroke="#d3d3d3" // Light grey background circle (full border)
        strokeWidth="2.5"
      />
      <circle
        cx="18"
        cy="18"
        r="15.915"
        fill="none"
        stroke="#28a745" // Green progress stroke
        strokeWidth="2.5"
        strokeDasharray={`${getProgressToNextLevel(readingLevel)}, 100`} // Dynamically calculate progress
        strokeDashoffset="0"
      />
    </svg>
    <div
      style={{
        color: 'white',
        zIndex: 1, // Make sure text appears over the SVG circle
      }}
    >
      <p style={{ fontSize: '1rem' }}>Reading Level:</p>
      <h1>{getLetterGrade(readingLevel)}</h1>
      <small>{readingLevel}/500</small>
    </div>
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
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'mediumvioletred'
    }}
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 36 36"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'rotate(-90deg)',
      }}
    >
      <circle
        cx="18"
        cy="18"
        r="15.915"
        fill="none"
        stroke="#d3d3d3" // Light gray background circle (full border)
        strokeWidth="2.5"
      />
      <circle
        cx="18"
        cy="18"
        r="15.915"
        fill="none"
        stroke="#d858b1" // Progress stroke color
        strokeWidth="2.5"
        strokeDasharray={`${totalStories > 0 ? (totalStoriesRead / totalStories) * 100 : 0}, 100`} // Handle division by zero
        strokeDashoffset="0"
      />
    </svg>
    <div
      style={{
        color: 'white',
        zIndex: 1, // Make sure text appears over the SVG circle
      }}
    >
      <p style={{ fontSize: '1rem' }}>Stories Completed:</p>
      <h1>{totalStoriesRead}/{totalStories > 0 ? totalStories : 'N/A'}</h1> {/* Avoid showing 0/0 */}
    </div>
  </div>
</Col>

      </Row>
    </Container>
  );
};

export default UserSummaryComponent;
