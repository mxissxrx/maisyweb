import React, { useState, useEffect } from "react";
import { data } from "./amazonItems";
import "./Amazon.css";

const Amazon = () => {
  const [region, setRegion] = useState("US");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 28;

  const regions = [
    { code: "CA", name: "Canada 🇨🇦" },
    { code: "US", name: "United States 🇺🇸" },
  ];

  const reversedData = [...data].sort((a, b) => b.id - a.id);

  const categories = ["All", ...new Set(data.map((item) => item.category))];
  const styles = ["All", ...new Set(data.flatMap((item) => item.style))];

  const filteredData = reversedData.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const styleMatch =
      selectedStyle === "All" || item.style.includes(selectedStyle);
    return categoryMatch && styleMatch;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Scroll to top only when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Keep previous effect to reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedStyle]);

  return (
    <section className="bg-white py-16 px-4">
      <h2 className="my-text text-3xl font-semibold text-center mb-10">AMAZON FINDS</h2>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center max-w-6xl mx-auto mb-10">
        <div className="flex flex-wrap justify-center gap-3 mb-6 lg:mb-0">
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

        <div className="flex justify-center lg:justify-end mt-4 lg:mt-0 lg:ml-auto">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {regions.map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8">
        <aside className="lg:w-1/5 w-full mb-8 lg:mb-0">
          <h3 className="text-lg font-semibold mb-3">Filter by Style</h3>
          <div className="flex lg:flex-col flex-row gap-2 lg:gap-3 overflow-x-auto lg:overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2 pr-2">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedStyle === style
                    ? "bg-[#FCE9FC] text-black shadow-sm"
                    : "bg-[#FAF9FA] text-black hover:bg-[#F1EFF1]"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </aside>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 flex-1">
          {visibleItems.map((item) => (
            <a
              key={item.id}
              href={item.links[region]}
              target="_blank"
              rel="noopener noreferrer"
              className="block group text-center"
            >
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
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

export default Amazon;






