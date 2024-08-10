import './App.css'
import {Routes, Route } from 'react-router-dom'
import MainPageComponent from './components/MainPageComponent'
import FooterComponent from './components/FooterComponent'
import AdminPage from './components/AdminPage'
import TeacherMainPage from './components/TeacherMainPage'

function App() {
  

  return (
    <>
      <Routes>
        <Route path = "/" element={<MainPageComponent/>}></Route>
        <Route path = "/admin" element= {<AdminPage/>}></Route>
        <Route path = "/teacher" element= {<TeacherMainPage/>}></Route>
        
      </Routes>
      <FooterComponent/>


    </>
  )
}

export default App
