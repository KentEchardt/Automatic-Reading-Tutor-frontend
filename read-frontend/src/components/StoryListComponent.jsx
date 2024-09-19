// Component for displaying Stories for Users to choose from
import {React, useState, useEffect} from 'react';
import 'react-multi-carousel/lib/styles.css'; // Import the carousel styles
import UserSummaryComponent from './UserSummaryComponent';
import {Container,Row} from 'react-bootstrap'
import StoryCarousel from './StoryCarousel';
import { getStoryListings, getCurrentStories } from '../services/Stories';
import { getUsername } from '../services/users';




const responsiveSettings = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  }
};


//Component for displaying all story carousels
const StoryListComponent = () => {

  const [storyListings, setStoryListings] = useState([])
  const [currentStoryListings, setCurrentStoryListings] = useState([])
  const [username, setUsername] = useState('')


// Fetch story listings data
useEffect(() => {
  const fetchStoryListings = async () => {
    try {
      const response = await getStoryListings();
      setStoryListings(response);
    } catch (error) {
      console.error('Error fetching current story listings:', error);
    }
  };

  const fetchCurrentStories = async () => {
    try {
      const response = await getCurrentStories();
      setCurrentStoryListings(response);
    } catch (error) {
      console.error('Error fetching story listings:', error);
    }
  };

  fetchStoryListings();
  fetchCurrentStories();
}, []);



  const easyStories = storyListings.filter(story => story.difficulty_level === 'easy');
  const mediumStories = storyListings.filter(story => story.difficulty_level === 'medium');
  const hardStories = storyListings.filter(story => story.difficulty_level === 'hard');

  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      
      <div style={{ marginBottom: '5cqh', paddingTop: '10cqh' }}>
        <UserSummaryComponent user={null} mostrecentstory={null} />
      </div>

      <Container fluid style={{ paddingBottom: '10cqh' }}>
        {/* Currently Reading Stories Carousel */}
        <Row style={{ height: "auto" }}>
          <h3 style={{ marginTop: "5cqh", marginBottom: '2.5cqh', }}>Currently Reading</h3>
          <StoryCarousel stories={currentStoryListings} responsiveSettings={responsiveSettings} containerClass={"recommended-carousel"}/>
        </Row>


        {/* Recommended Stories Carousel -- to be implemented at another time */}
        {/* <Row style={{ height: "auto" }}>
          <h3 style={{ marginTop: "5cqh", marginBottom: '2.5cqh', }}>Recommended Stories</h3>
          <StoryCarousel stories={null} responsiveSettings={responsiveSettings} containerClass={"other-carousels"}/>
        </Row> */}

        {/* My List Stories Carousel */}
        <Row>
          <h3 style={{ marginTop: "5cqh", marginBottom: '2.5cqh' }}>My List</h3>
           <StoryCarousel stories={hardStories} responsiveSettings={responsiveSettings} containerClass={"other-carousels"}/>
        </Row>

        {/* Easy Stories Carousel */}
        <Row>
          <h3 style={{ marginTop: "5cqh", marginBottom: '2.5cqh' }}>Easy Stories</h3>
          <StoryCarousel stories={easyStories} responsiveSettings={responsiveSettings} containerClass={"other-carousels"}/>
        </Row>

        {/* Medium Stories Carousel */}
        <Row>
          <h3 style={{ marginTop: "5cqh", marginBottom: '2.5cqh' }}>Medium Stories</h3>
          <StoryCarousel stories={mediumStories} responsiveSettings={responsiveSettings} containerClass={"other-carousels"}/>
        </Row>

        {/* Hard Stories Carousel */}
        <Row>
          <h3 style={{ marginTop: "5cqh", marginBottom: '2.5cqh' }}>Hard Stories</h3>
          <StoryCarousel stories={hardStories} responsiveSettings={responsiveSettings} containerClass={"other-carousels"}/>
        </Row>
      </Container>
    </div>
  );
};

export default StoryListComponent;
