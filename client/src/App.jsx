/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import ArtistProfile from './pages/ArtistProfile'
import Account from './pages/Account'
import Premium from './pages/Premium'
import Library from './pages/Library'
import Playback from './components/Playback'
import { useRef } from 'react'
import Play from './components/Play'
import Explore from './pages/Explore'
import 'regenerator-runtime/runtime'
import Playlist from './pages/Playlist'
import AudioProvider from './context/AudioContext'
import AddToPlayList from './components/AddToPlayList'
import { useDispatch, useSelector } from 'react-redux'
import { restoreUser } from './redux/slice/accountSlice'

function App() {

  let [open, setOpen] = useState(false)
  let [bar, setBar] = useState(false)
  let { login } = useSelector((state) => state.account)
  let dis = useDispatch()

  // Restore user on app load from localStorage
  useEffect(() => {
    dis(restoreUser())
  }, [dis])

  // let {audio} = useContext(AudioContext)
  let barHandler = () =>
  {
     setBar(!bar)
  }

  let toggleHandler = () => {
    setBar(false)
    setOpen(!open)
  }

  return (
    <div className='App relative bg-black'>
      <NavBar className="z-50" />
      <AudioProvider>
        <Routes >
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/artist/:id' element={<ArtistProfile />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/library' element={<Library />}></Route>
          <Route path='/premium' element={<Premium />}></Route>
          <Route path='/explore' element={<Explore />}></Route>
          <Route path='/playlist/:id' element={<Playlist />}></Route>
        </Routes>
        <Playback className="text-white" toggleHandler={toggleHandler} open={open} setOpen={setOpen} />
        <Play bar={bar} setBar={setBar} barHandler={barHandler} toggleHandler={toggleHandler} open={open} setOpen={setOpen} />
        <AddToPlayList bar={bar} setBar={setBar} barHandler={barHandler} />
      </AudioProvider>
    </div>
  )
}

export default App
