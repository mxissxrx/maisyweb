import React, { useState, useEffect } from "react";
import { data } from "./pinPosts";
import "./Pinterest.css";

const Pinterest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const reversedData = [...data].sort((a, b) => b.id - a.id);

  const filteredData = reversedData.filter((post) =>
    post.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="bg-white py-16 px-4">
      <h2 className="my-text text-3xl text-center mb-4">
        PINTEREST FITS
      </h2>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by creator..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <div className="flex flex-col gap-12 max-w-6xl mx-auto">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 rounded-2xl shadow-md overflow-hidden bg-[#fdfdfd] p-6"
          >
            <div className="w-full md:w-2/5 flex flex-col items-center">
              <img
                src={post.mainImage}
                alt={post.alt}
                className="w-[85%] min-h-[450px] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="h-[1px] bg-gray-200 w-[60%] my-2"></div>
              <p className="text-sm text-gray-600 text-center italic max-w-[80%]">
                {post.alt}
              </p>
            </div>

            <div className="w-full md:w-3/5 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {post.items.map((item, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-[#fff]"
                >
                  <a
                    href={item.link || "#"}
                    onClick={(e) => {
                      if (!item.link) e.preventDefault();
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center bg-[#fdfdfd] aspect-[3/4]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </a>

                  {item.regions && (
                    <div className="absolute bottom-2 left-2 flex gap-2 bg-white/80 rounded-md p-1 text-xs">
                      {item.regions.map((region, idx) => (
                        <a
                          key={idx}
                          href={region.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {region.flag}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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
      </div>
    </section>
  );
};

export default Pinterest;







