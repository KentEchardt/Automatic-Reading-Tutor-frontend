import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { getMostPopularStory, getLeastPopularStory, getMostEngagedStory } from '../services/Stories';
import { FaThumbsUp, FaThumbsDown, FaClock } from 'react-icons/fa';

const StoryStatCard = ({ title, icon, storyTitle, data }) => (
  <Card className="mb-4 h-100 shadow-sm" style={{ transition: 'all 0.3s' }}>
    <Card.Body>
      <div className="d-flex align-items-center mb-3">
        {icon}
        <Card.Title className="mb-0 ms-2">{title}</Card.Title>
      </div>
      <Card.Subtitle className="mb-2 text-muted">{storyTitle}</Card.Subtitle>
      <Card.Text className="fs-4 fw-bold">{data}</Card.Text>
    </Card.Body>
  </Card>
);

const StoryStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [mostPopular, leastPopular, mostEngaged] = await Promise.all([
        getMostPopularStory(),
        getLeastPopularStory(),
        getMostEngagedStory()
      ]);
      setStats({ mostPopular, leastPopular, mostEngaged });
      console.log(stats)
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Story Statistics</h2>
      <Row>
        <Col md={4}>
          <StoryStatCard
            title="Most Popular"
            icon={<FaThumbsUp size={24} className="text-success" />}
            storyTitle={stats.mostPopular.story.title}
            data={`${stats.mostPopular.sessionCount} sessions`}
          />
        </Col>
        <Col md={4}>
          <StoryStatCard
            title="Least Popular"
            icon={<FaThumbsDown size={24} className="text-danger" />}
            storyTitle={stats.leastPopular.story.title}
            data={`${stats.leastPopular.sessionCount} sessions`}
          />
        </Col>
        <Col md={4}>
          <StoryStatCard
            title="Most Engaged"
            icon={<FaClock size={24} className="text-primary" />}
            storyTitle={stats.mostEngaged.story.title}
            data={stats.mostEngaged.totalEngagement}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default StoryStatistics;