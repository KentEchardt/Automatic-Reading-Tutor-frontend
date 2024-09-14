import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { getAverageReadingDuration, getAverageProgress, getAverageReadingLevel, getAverageTimeToComplete } from '../services/users';
import { FaClock, FaChartLine, FaBookReader, FaFlag } from 'react-icons/fa';

const UserStatCard = ({ title, icon, data }) => (
  <Card className="mb-4 h-100 shadow-sm" style={{ transition: 'all 0.3s' }}>
    <Card.Body>
      <div className="d-flex align-items-center mb-3">
        {icon}
        <Card.Title className="mb-0 ms-2">{title}</Card.Title>
      </div>
      <Card.Text className="fs-4 fw-bold">{data}</Card.Text>
    </Card.Body>
  </Card>
);

const UserStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [avgDuration, avgProgress, avgLevel, avgTimeToComplete] = await Promise.all([
        getAverageReadingDuration(),
        getAverageProgress(),
        getAverageReadingLevel(),
        getAverageTimeToComplete()
      ]);
      setStats({ avgDuration, avgProgress, avgLevel, avgTimeToComplete });
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
      <h2 className="mb-4 text-center">User Statistics</h2>
      <Row>
        <Col md={3}>
          <UserStatCard
            title="Avg. Reading Duration"
            icon={<FaClock size={24} className="text-primary" />}
            data={stats.avgDuration}
          />
        </Col>
        <Col md={3}>
          <UserStatCard
            title="Avg. Progress"
            icon={<FaChartLine size={24} className="text-success" />}
            data={`${stats.avgProgress}%`}
          />
        </Col>
        <Col md={3}>
          <UserStatCard
            title="Avg. Reading Level"
            icon={<FaBookReader size={24} className="text-info" />}
            data={stats.avgLevel}
          />
        </Col>
        <Col md={3}>
          <UserStatCard
            title="Avg. Time to Complete"
            icon={<FaFlag size={24} className="text-danger" />}
            data={stats.avgTimeToComplete?stats.avgTimeToComplete:"No completed stories found"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserStatistics;