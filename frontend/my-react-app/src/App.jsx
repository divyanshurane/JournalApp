import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import JournalCard from './components/JournalCard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NewEntry from './pages/NewEntry'
import Home from './pages/Home'
import OauthCallback from './pages/OauthCallback';
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* // <Navbar/>
      // <JournalCard/>
      // <JournalCard/>
      // <JournalCard/> */}
      {/* <Login/> */}
      {/* <SignUp/> */}
      {/* <NewEntry/>  */}
      {/* <Home/> */}
      <BrowserRouter>
        <Routes>
            <Route path ="/login" element={<Login/>}/>
            <Route path ="/Signup" element={<SignUp/>}/>
            <Route path ="/oauth/callback" element={<OauthCallback/>}/>
            <Route path ="/journal" element={<Home/>}/>
            <Route path ="/journal/new" element={<NewEntry/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
