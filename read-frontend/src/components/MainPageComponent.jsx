import React from 'react'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import StoryListComponent from './StoryListComponent'

//Component for displaying the Reader main page
const MainPageComponent = () => {
  return (
    <div>
        <HeaderComponent/>

        {/* Move UserSummaryComponent here once endpoints are set up and can access user and recent story */}
        
        <div>
          <StoryListComponent/>
        </div>
    </div>
  )
}

export default MainPageComponent