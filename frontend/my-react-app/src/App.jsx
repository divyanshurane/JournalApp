import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import JournalCard from './components/JournalCard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NewEntry from './pages/NewEntry'
import Home from './pages/Home'
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
      <Home/>
    </>
  )
}

export default App
