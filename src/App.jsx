import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Notes from './pages/Notes'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NewNoteAdd from './pages/NewNoteAdd'
import { LogOut } from './pages/LogOut'
import Profile from './pages/Profile'
import UpdatePassword from './pages/UpdatePassword'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/newnote" element={<NewNoteAdd />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-password" element={<UpdatePassword />} />
   
      </Routes>
    </div>
  )
}

export default App