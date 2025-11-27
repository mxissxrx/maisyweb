import React from 'react'
import { FaTiktok, FaPinterest } from "react-icons/fa";
import logo from '../../assets/mxissxrx-logoT.png'
import './About.css'

const About = () => {
  return (
    <div className="bg-[#FBEAF2] flex justify-center py-16 px-4 min-h-[400px]">
      <div className="max-w-6xl w-full flex flex-col items-center gap-8">

        <img
          src={logo}
          alt="mxissxrx logo"
          className="w-30 drop-shadow-md mb-4"
        />

        <h3 className="text-2xl text-black mb-4 font-EpicaSansProBold">
          Follow My Socials
        </h3>

        <div className="flex gap-6 text-5xl text-black">
          <a href="https://www.tiktok.com/@mxis.sxrx" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>

          <a href="https://ca.pinterest.com/mxissxrx/" target="_blank" rel="noopener noreferrer">
            <FaPinterest />
          </a>
        </div>
      </div>
    </div>
  )
}

export default About


