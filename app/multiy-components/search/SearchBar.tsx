"use client";

import { useSearch } from "./SearchContext";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, filteredProducts } = useSearch();
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle search submission
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${searchQuery}`);
      setShowSearch(false); // Hide search input after navigation
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus the input when it becomes visible
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <div className="relative">
      {showSearch && (
        <div ref={searchInputRef} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-80 lg:w-96"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            aria-label="Search for products"
          />
          <IoSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
            aria-hidden="true"
          />
        </div>
      )}

      <button
        onClick={() => setShowSearch(!showSearch)}
        aria-label="Toggle search"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <IoSearch className="text-[#23A6F0]" size={24} />
      </button>

      {showSearch && filteredProducts.length > 0 && <SearchResults />}
    </div>
  );
};

export default SearchBar;
