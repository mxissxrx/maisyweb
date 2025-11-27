import React, { useState, useEffect } from "react";
import { data } from "./amazonItems";
import "./Amazon.css";

const Amazon = () => {
  const [region, setRegion] = useState("US");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 28;

  const regions = [
    { code: "CA", name: "Canada 🇨🇦" },
    { code: "US", name: "United States 🇺🇸" },
  ];

  const reversedData = [...data].sort((a, b) => b.id - a.id);

  const categories = ["All", ...new Set(data.map((item) => item.category))];

  const styles =
    selectedCategory === "All"
      ? []
      : [
          ...new Set(
            data
              .filter((item) => item.category === selectedCategory)
              .flatMap((item) => item.style)
          ),
        ];

  const filteredData = reversedData.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;

    const styleMatch =
      selectedStyle === "" || item.style.includes(selectedStyle);

    return categoryMatch && styleMatch;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedStyle("");
  }, [selectedCategory]);

  return (
    <section className="bg-white py-16 px-4">
      <h2 className="my-text text-3xl font-semibold text-center mb-10">
        AMAZON FINDS
      </h2>

      <div className="max-w-6xl mx-auto mb-6">


      <div className="w-full overflow-x-auto md:overflow-x-visible scroll-thin mb-6 px-2">
        <div className="flex flex-nowrap md:flex-wrap gap-4 justify-center w-max md:w-full mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm transition
                ${
                  selectedCategory === category
                    ? "bg-[#FCE9FC] shadow-sm text-black font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none"
        >
        {regions.map((r) => (
          <option key={r.code} value={r.code}>
              {r.name}
          </option>
          ))}
        </select>
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-60 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.05)]"></div></div>

      <div className="w-full mb-10 px-2">
        <div className="flex flex-wrap gap-3 justify-center mx-auto">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-4 py-2 rounded-full text-sm transition
                ${
                  selectedStyle === style
                    ? "bg-[#FCE9FC] text-black shadow-sm font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8">
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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





