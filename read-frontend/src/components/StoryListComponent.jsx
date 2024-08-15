// Component for displaying Stories for Users to choose from
import {React, useState, useEffect} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import the carousel styles
import StoryCard from './StoryCard';
import UserSummaryComponent from './UserSummaryComponent';
import {Container,Row} from 'react-bootstrap'
import StoryCarousel from './StoryCarousel';

const dummydata = {
  "stories": [
    {
      "title": "The Lost Puppy",
      "description": "A heartwarming tale of a puppy finding its way home.",
      "difficulty": "easy",
      "image": "images/puppy.jpeg"
    },
    {
      "title": "Mystery at the Old Mansion",
      "description": "A group of kids uncover secrets hidden in an abandoned mansion.",
      "difficulty": "medium",
      "image": "images/mystery.jpeg"
    },
    {
      "title": "Journey to the Dragon's Lair",
      "description": "An epic adventure where a hero battles a dragon.",
      "difficulty": "hard",
      "image": "images/dragon.jpeg"
    },
    {
      "title": "The Enchanted Forest",
      "description": "Discover the magical creatures living in the forest.",
      "difficulty": "easy",
      "image": "images/forest.jpeg"
    },
    {
      "title": "The Secret Ingredient",
      "description": "A cooking competition with a surprising twist.",
      "difficulty": "medium",
      "image": "images/cooking.jpeg"
    },
    {
      "title": "Escape from the Underworld",
      "description": "A daring escape from a dangerous underworld.",
      "difficulty": "hard",
      "image": "images/underworld.jpeg"
    },
    {
      "title": "The Space Explorer",
      "description": "A journey through the stars to discover new planets.",
      "difficulty": "easy",
      "image": "images/space.jpeg"
    },
    {
      "title": "The Haunted Library",
      "description": "A spooky story about a haunted library with mysterious books.",
      "difficulty": "medium",
      "image": "images/library.jpeg"
    },
    {
      "title": "Race to the Finish",
      "description": "An intense race where the winner takes it all.",
      "difficulty": "hard",
      "image": "images/race.jpeg"
    }
  ],
  "user": {
    "username": "<Username>",
    "readingLevel": "A",
    "totalStoriesRead": "100",
  }
};

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

//Defining and handling selectedStory, which is used to determine when a story should be shown in a Modal
// const [selectedStory, setSelectedStory] = useState(null);
// const handleView = (story) => {
//   setSelectedStory(story);
// };

// const handleClose = () => {
//   setSelectedStory(null);
// };

//Component for displaying all story carousels
const StoryListComponent = () => {
  const easyStories = dummydata.stories.filter(story => story.difficulty === 'easy');
  const mediumStories = dummydata.stories.filter(story => story.difficulty === 'medium');
  const hardStories = dummydata.stories.filter(story => story.difficulty === 'hard');

  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      
      <div style={{ marginBottom: '5cqh', paddingTop: '10cqh' }}>
        <UserSummaryComponent user={dummydata.user} mostrecentstory={dummydata.stories[1]} />
      </div>

      <Container fluid style={{ paddingBottom: '10cqh' }}>

        {/* Recommended Stories Carousel */}
        <Row style={{ height: "auto" }}>
          <h3 style={{ marginTop: "5cqh", marginBottom: '2.5cqh', }}>Recommended Stories</h3>
          <StoryCarousel stories={dummydata.stories} responsiveSettings={responsiveSettings} containerClass={"recommended-carousel"}/>
        </Row>

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
