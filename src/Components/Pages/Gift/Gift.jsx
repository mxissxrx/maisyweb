import React, { useState, useEffect } from "react";
import { data } from "./giftItems"; 
import "./Gift.css"; 

const Gift = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 28;

  const reversedData = [...data].sort((a, b) => b.id - a.id);

const categories = ["All", ...new Set(
  data.flatMap((item) => item.categories)
)];
  
  const filteredData = reversedData.filter((item) => {
  return selectedCategory === "All" || item.categories.includes(selectedCategory);});


  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <section className="bg-white py-16 px-4">
      <h2 className="my-text text-3xl font-semibold text-center mb-10">GIFT THAT!</h2>

      <div className="flex flex-col items-center max-w-6xl mx-auto mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-[#FCE9FC] text-black"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
  {visibleItems.map((item) => (
    <a
      key={item.id}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="relative w-full aspect-square bg-[#fafafa] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <img
          src={item.src}
          alt={item.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </a>
  ))}
</div>


      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full ${
              currentPage === 1
                ? "text-gray-400"
                : "hover:bg-pink-100 text-black"
            }`}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full ${
                currentPage === i + 1
                  ? "bg-pink-100 text-black font-semibold"
                  : "hover:bg-pink-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full ${
              currentPage === totalPages
                ? "text-gray-400"
                : "hover:bg-pink-100 text-black"
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </section>
  );
};

export default Gift;
