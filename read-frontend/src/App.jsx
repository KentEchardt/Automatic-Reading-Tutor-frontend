import './App.css'
import {Routes, Route } from 'react-router-dom'
import MainPageComponent from './components/MainPageComponent'
import FooterComponent from './components/FooterComponent'

function App() {
  

  return (
    <>
      <Routes>
        <Route path = "/" element={<MainPageComponent/>}></Route>
      </Routes>
      <FooterComponent/>


    </>
  )
}

export default App
