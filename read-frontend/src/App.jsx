import './App.css'
import {Routes, Route , BrowserRouter} from 'react-router-dom'
import MainPageComponent from './components/MainPageComponent'
import FooterComponent from './components/FooterComponent'
import AdminPage from './components/AdminPage'
import TeacherMainPage from './components/TeacherMainPage'
import LoginComponent from './components/LoginComponent'
import PrivacyPolicy from './components/PrivacyPolicy'
import DemoTest from './components/DemoTest'
import StoryReader from './components/StoryReader'

function App() {
  

  return (
    <>
    
      <Routes>
        
        <Route path = "/login" element= {<LoginComponent/>}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
        <Route path = "/" element={<MainPageComponent/>}></Route>
        <Route path = "/admin" element= {<AdminPage/>}></Route>
        <Route path = "/teacher" element= {<TeacherMainPage/>}></Route>
        <Route path="/story/:storyId" element={<StoryReader />} />
        
      </Routes>
      <FooterComponent/>


    </>
  )
}

export default App
