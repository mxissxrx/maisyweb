import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Components/NavBar/Navbar'
import Logo from './Components/Logo/Logo'

import Home from './Components/Pages/Home'
import Pinterest from './Components/Pages/Pinterest/Pinterest'
import Amazon from './Components/Pages/Amazon/Amazon'
import Dhgate from './Components/Pages/Dhgate/Dhgate'

// A small inner component so we can safely use `useNavigate`
const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const links = [
    { name: "HOME", path: "/" },
    { name: "PINTEREST POSTS", path: "/pinterest" },
    { name: "AMAZON FINDS", path: "/amazon" },
    { name: "DHGATE FINDS", path: "/dhgate" },
  ]

  const handleLinkClick = (path) => {
    setIsMenuOpen(false)
    setTimeout(() => {
      navigate(path) // ✅ uses React Router navigation instead of full reload
    }, 250)
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Navbar + Logo */}
      <div className="relative z-50">
        <Logo />
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pinterest" element={<Pinterest />} />
        <Route path="/amazon" element={<Amazon />} />
        <Route path="/dhgate" element={<Dhgate />} />
      </Routes>

      {/* Mobile Menu (Slide-up) */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-[#FBEAF2] z-40 transform transition-transform duration-500 ease-in-out
          ${isMenuOpen ? "translate-y-0" : "translate-y-full"} rounded-t-3xl top-28 lg:top-auto`}
      >
        <ul className="flex flex-col items-center gap-6 py-8 text-lg">
          {links.map((link) => (
            <li
              key={link.name}
              className="w-full text-center p-4 hover:bg-white cursor-pointer transition-all"
            >
              <button
                onClick={() => handleLinkClick(link.path)}
                className="font-bold uppercase tracking-[2.6px]"
                style={{ fontFamily: 'HelveticaNeueLight' }}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App



