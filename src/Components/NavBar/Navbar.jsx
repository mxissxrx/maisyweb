import React from 'react'
import { Link } from 'react-router-dom'
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5"
import './Navbar.css'

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const links = [
    { name: "HOME", path: "/" },
    { name: "PINTEREST FITS", path: "/pinterest" },
    { name: "AMAZON FINDS", path: "/amazon" },
    { name: "DHGATE FINDS", path: "/dhgate" },
  ]

  return (
    <div className="relative top-0 left-0 w-full flex items-center justify-between lg:justify-center bg-white bg-opacity-70 py-5 px-6 z-50 navbar">
      <ul className="hidden lg:flex items-center gap-12 text-base md:text-2xl lg:text-2xl xl:text-xl">
        {links.map((link) => (
          <li key={link.name} className="relative cursor-pointer group">
            <Link to={link.path}>{link.name}</Link>
            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {isMenuOpen ? (
        <IoCloseOutline
          className="lg:hidden text-4xl cursor-pointer transition-transform duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : (
        <IoMenuOutline
          className="lg:hidden text-4xl cursor-pointer transition-transform duration-300"
          onClick={() => setIsMenuOpen(true)}
        />
      )}
    </div>
  )
}

export default Navbar


