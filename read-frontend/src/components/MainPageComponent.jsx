import React from 'react'
import HeaderComponent from './HeaderComponent'
import StoryListComponent from './StoryListComponent'

//Component for displaying the Reader main page
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