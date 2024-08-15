import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StoryCard from './StoryCard';

//Component for displaying stories for users to select from using Carousels
const StoryCarousel = ({ stories, responsiveSettings, containerClass }) => {
  return (
  
      <Carousel
        responsive={responsiveSettings}
        arrows
        infinite
        autoPlaySpeed={3000}
        centerMode
        swipeable
        draggable
        keyBoardControl
        containerClass={containerClass}
        itemClass=""
        showDots={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        className='custom-navbar-border'
      >
        {stories.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))}
      </Carousel>
   
  );
};

export default StoryCarousel;
