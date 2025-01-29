"use client";

import { useSearch } from "./SearchContext";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Use Next.js Image component for optimized images

const SearchResults = () => {
  const { filteredProducts, setSearchQuery } = useSearch();
  const router = useRouter();

  const handleSelect = (id: string) => {
    setSearchQuery(""); // Clear input
    router.push(`/products/${id}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      handleSelect(id);
    }
  };

  if (filteredProducts.length === 0) {
    return null; // Don't render anything if there are no results
  }

  return (
    <ul
      className="absolute bg-white shadow-lg border mt-2 p-2 w-full md:w-96 rounded-lg z-50"
      role="listbox"
      aria-label="Search results"
    >
      {filteredProducts.slice(0, 5).map((product) => (
        <li
          key={product._id}
          role="option"
          tabIndex={0}
          className="p-2 hover:bg-gray-100 cursor-pointer rounded-md transition-colors flex items-center gap-3"
          onClick={() => handleSelect(product._id)}
          onKeyDown={(e) => handleKeyDown(e, product._id)}
          aria-label={`Select ${product.title}`}
        >
          <div className="w-10 h-10 relative flex-shrink-0">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded-md"
              sizes="40px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium truncate">{product.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;