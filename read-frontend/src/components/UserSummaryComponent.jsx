import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StoryCircle from './StoryCircle';

//Component for displaying summary user data in circles on main User screen
const UserSummaryComponent = ({ user, mostrecentstory }) => {
  return (
    <Container className="text-center">
        <Row style={{ marginBottom:'10cqh'}}>
           <h2 >{user.username}</h2> 
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
            <p style={{ fontSize: '1rem' }}>Reading Level: {user.readingLevel}</p>
          </div>
        </Col>
        <Col xs={4} className="d-flex justify-content-center" style={{ transform: 'translateY(-10%)' }}>
          <StoryCircle story={mostrecentstory} />
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
            <p style={{ fontSize: '1rem' }}>Stories Read: {user.totalStoriesRead}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSummaryComponent;
