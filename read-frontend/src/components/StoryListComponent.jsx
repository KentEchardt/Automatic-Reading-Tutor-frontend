import React from 'react'
import { Carousel, Container, Row } from 'react-bootstrap';
import StoryCard from './StoryCard'; // Assuming StoryCard component is in the same folder

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
    ]
  }
  


  const StoryListComponent = () => {
    const easyStories = dummydata.stories.filter(story => story.difficulty === 'easy');
    const mediumStories = dummydata.stories.filter(story => story.difficulty === 'medium');
    const hardStories = dummydata.stories.filter(story => story.difficulty === 'hard');
  
    return (
        <div>
            <div style={{height:'50cqh'}}>
            <h1>Welcome User!</h1>
        </div>
       

        <Container fluid style={{marginBottom:'4cqh'}}>
                    
        {/* Recommended Stories Carousel */}
        <Row>
            <h3 style={{marginTop:"4cqh", marginBottom: '2cqh'}}>Recommended Stories</h3>
            <div style={{height:'30cqh'}}></div>
        <Carousel indicators={false} interval={null}>
          {/* Add multiple items in a single carousel item */}
          <Carousel.Item>
            <div className="d-flex justify-content-between">
              {/* Placeholder for recommended story cards */}
            </div>
          </Carousel.Item>
        </Carousel>
  
        {/* Easy Stories Carousel */}
        <h3 style={{marginTop:"4cqh", marginBottom: '2cqh'}}>Easy Stories</h3>
        <Carousel indicators={false} interval={null}>
          <Carousel.Item>
            <div className="d-flex justify-content-between">
              {easyStories.map((story, index) => (
                <StoryCard key={index} story={story} />
              ))}
            </div>
          </Carousel.Item>
        </Carousel>
        </Row>

         {/* Medium Stories Carousel */}
        <Row>
           <h3 style={{marginTop:"4cqh", marginBottom: '2cqh'}}>Medium Stories</h3>
        <Carousel indicators={false} interval={null}>
          <Carousel.Item>
            <div className="d-flex justify-content-between">
              {mediumStories.map((story, index) => (
                <StoryCard key={index} story={story} />
              ))}
            </div>
          </Carousel.Item>
        </Carousel> 
        </Row>
  
       
        
        
        {/* Hard Stories Carousel */}
        <Row>
            <h3 style={{marginTop:"4cqh", marginBottom: '2cqh'}}>Hard Stories</h3>
        <Carousel indicators={false} interval={null}>
          <Carousel.Item>
            <div className="d-flex justify-content-between">
              {hardStories.map((story, index) => (
                <StoryCard key={index} story={story} />
              ))}
            </div>
          </Carousel.Item>
        </Carousel>
        </Row>
        
      </Container>


        </div>
      
    );
  };
  
export default StoryListComponent