"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  title: string;
  imageUrl: string;
}

export default function SearchBar({ onClose }: { onClose?: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    try {
      const searchQuery = `*[_type == "product" && title match $query] {
        _id,
        title,
        "imageUrl": productImage.asset->url
      }`;
      const params: Record<string, string> = { query: `${query}*` };
      const results = await client.fetch<Product[]>(searchQuery, params);
      setSuggestions(results);
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
      onClose?.(); // Close search on submit
    }
  };

  return (
    <div className="relative w-full max-w-lg">

      <form onSubmit={handleSearch} className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
        <Search />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 px-2 py-1"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto z-50">
          {loading ? (
            <p className="p-3 text-gray-500">Loading...</p>
          ) : (
            suggestions.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`} onClick={onClose}>
                <div className="flex items-center p-3 hover:bg-gray-100 transition duration-200 cursor-pointer">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <p className="ml-3 text-sm font-medium text-gray-800">{product.title}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
