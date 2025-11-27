import React, { useState, useEffect } from "react";
import { data } from "../Dhgate/dhgateItems";
import "./Dhgate.css";

const Dhgate = () => {
  const itemsPerPage = 48;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [currency, setCurrency] = useState("CAD");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, searchTerm]);

  const conversionRates = {
    CAD: 1,
    USD: 0.71,
    EUR: 0.62,
  };

  const currencySymbols = {
    CAD: "$",
    USD: "$",
    EUR: "€",
  };

  const categories = ["All", ...new Set(data.map((item) => item.category))];
  const brands = ["All", ...new Set(data.map((item) => item.brand))];

  const filteredData = data.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const brandMatch = selectedBrand === "All" || item.brand === selectedBrand;
    const searchMatch = item.alt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && brandMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (type, value) => {
    if (type === "category") setSelectedCategory(value);
    if (type === "brand") setSelectedBrand(value);
    setCurrentPage(1);
  };

  return (
    <section className="bg-white py-16 px-4">
      <h2 className="my-text text-3xl text-center mb-10 font-semibold">
        DHGATE FINDS
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/5 w-full">
          <h3 className="text-lg font-semibold mb-4">Search</h3>

          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full mb-6 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <h4 className="text-md font-semibold mb-2">Filter by Brand</h4>
          <div className="flex lg:flex-col flex-row gap-2 lg:gap-3 overflow-x-auto lg:overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2 pr-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleFilterChange("brand", brand)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-sm transition ${
                  selectedBrand === brand
                    ? "bg-[#FCE9FC] text-black font-medium"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange("category", category)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    selectedCategory === category
                      ? "bg-[#FCE9FC] text-black font-medium"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="CAD">CAD 🇨🇦</option>
                <option value="USD">USD 🇺🇸</option>
                <option value="EUR">EUR 🇪🇺</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center group"
              >
                <div className="overflow-hidden rounded-lg shadow-md">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-medium text-gray-900 italic">
                    '{item.alt}'
                  </h3>
                  <p className="text-gray-700 mt-1">
                    {currencySymbols[currency]}
                    {(item.price * conversionRates[currency]).toFixed(2)} {currency}
                  </p>
                </div>
              </a>
            ))}
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
      </div>
    </section>
  );
};

export default Dhgate;


