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

const parseDurationString = (durationString) => {
  // Duration string format is assumed to be "HH:MM:SS"
  const [hours, minutes, seconds] = durationString.split(':').map(Number);
  return (hours * 60) + minutes + (seconds / 60); // Convert to total minutes
};

const UserStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [avgDuration, avgProgress, avgLevel, avgTimeToComplete] = await Promise.all([
          getAverageReadingDuration(),
          getAverageProgress(),
          getAverageReadingLevel(),
          getAverageTimeToComplete()
        ]);

        // Convert average durations from string to total minutes
        const avgDurationInMinutes = parseDurationString(avgDuration);
        const avgTimeToCompleteInMinutes = parseDurationString(avgTimeToComplete);

        setStats({
          avgDuration: avgDurationInMinutes.toFixed(3),
          avgProgress: avgProgress.toFixed(3),
          avgLevel: avgLevel.toFixed(3),
          avgTimeToComplete: avgTimeToCompleteInMinutes.toFixed(3)
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError('Failed to fetch statistics. Please try again later.');
      }
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
            data={`${stats.avgDuration} mins`}
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
            data={`${stats.avgTimeToComplete} mins`}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserStatistics;
