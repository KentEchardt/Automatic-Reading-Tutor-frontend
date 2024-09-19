import './App.css'
import {Routes, Route , BrowserRouter} from 'react-router-dom'
import MainPageComponent from './components/MainPageComponent'
import FooterComponent from './components/FooterComponent'
import AdminPage from './components/AdminPage'
import TeacherMainPage from './components/TeacherMainPage'
import LoginComponent from './components/LoginComponent'
import PrivacyPolicy from './components/PrivacyPolicy'
import StoryReader from './components/StoryReader'
import RegisterComponent from './components/RegisterComponent'
import ProtectedRoute from './features/ProtectedRoute'// Import the ProtectedRoute component
import UserProfile from './components/UserProfile'

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterComponent/>}></Route>
        <Route path="/login" element={<LoginComponent/>}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
      

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute component={AdminPage} allowedRoles={['admin']} />
        }></Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={
          <ProtectedRoute component={TeacherMainPage} allowedRoles={['teacher']} />
        }></Route>
        
        {/* Reader Routes */}
        <Route path="/" element={
          <ProtectedRoute component={MainPageComponent} allowedRoles={['reader']} />
        }></Route>
        <Route path="/story/:storyId" element={
          <ProtectedRoute component={StoryReader} allowedRoles={['reader']} />
        }></Route>
        <Route path="/profile" element={
          <ProtectedRoute component={UserProfile} allowedRoles={['reader','teacher']} />
        }></Route>
        

      </Routes>
      <FooterComponent/>
    </>
  )
}

export default App
