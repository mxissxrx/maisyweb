import React from 'react'
import { Link } from 'react-router-dom'
import { data } from './popItemsData'
import './PopItems.css'

const PopItems = () => {
  return (
    <section className="pop-items bg-white min-h-[400px] py-10 lg:py-16">
      <h2 className="name text-3xl text-center mb-10 lg:mb-14">POPULAR DHGATE FINDS</h2>

      <div className="relative flex items-center px-8 mb-4">
        <div
          id="slider"
          className="overflow-x-auto overflow-y-hidden flex scroll-smooth gap-x-5 px-1 lg:px-6 lg:gap-x-8"
        >
          {data.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-[180px] h-[180px] 
                  md:w-[200px] md:h-[200px] 
                  lg:w-[220px] lg:h-[220px]
                  object-contain rounded-xl 
                  cursor-pointer bg-white shadow-md 
                  hover:scale-105 transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center py-3">
        <Link to="/dhgate">
          <button className="bg-[#FCE9FC] text-black text-lg px-6 py-2.5 rounded-xl cursor-pointer hover:scale-105 transition-all">
            View More
          </button>
        </Link>
      </div>
    </section>
  )
}

export default PopItems


