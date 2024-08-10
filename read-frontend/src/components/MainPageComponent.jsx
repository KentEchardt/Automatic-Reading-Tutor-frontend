import React from 'react'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import StoryListComponent from './StoryListComponent'


const MainPageComponent = () => {
  return (
    <div>
        <HeaderComponent/>
        <div>
          <StoryListComponent/>
        </div>
    </div>
  )
}

export default MainPageComponent