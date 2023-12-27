import React from 'react'
import Home from './pages/Home'
import AddEvents from './pages/AddEvents'
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-events" element={<AddEvents />} />
      </Routes>
    </div>
  )
}
