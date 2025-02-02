"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client"; // Adjust the import path for your Sanity client

// Define the Product type
interface Product {
  _id: string;
  title: string;
  imageUrl: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Debounce effect for API calls
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 300); // Adjust debounce time if needed

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Fetch product suggestions
  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    try {
      const searchQuery = `*[_type == "product" && title match $query] {
        _id,
        title,
        "imageUrl": productImage.asset->url
      }`;

      const params: Record<string, unknown> = { query: `${query.toLowerCase()}*` };
      const data = await client.fetch<Product[]>(searchQuery, params);
      setSuggestions(data); // ✅ Properly updating state
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSuggestions([]); // Clear suggestions after submitting search
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="flex items-center relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-10 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 overflow-hidden z-50">
          {loading ? (
            <p className="p-2 text-gray-500">Loading...</p>
          ) : (
            suggestions.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                onClick={() => setSearchTerm("")}
              >
                <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <p className="ml-3 text-sm text-gray-800">{product.title}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
