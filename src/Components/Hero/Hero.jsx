import React from 'react'
import './Hero.css'
import pink_wall from '../../assets/pink-stripe2.png'

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen hero-section">
  <img
    src={pink_wall}
    alt="pink wallpaper"
    className="absolute top-0 left-0 w-full h-screen object-cover hero-bg"
  />
</div>

  )
}

export default Hero
