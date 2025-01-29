"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  title: string;
  imageUrl: string
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
  isLoading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300); // Debounce with 300ms delay
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return [];
    return products.filter((product) =>
      product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery, products]);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
		const query = `*[_type == "product"] { _id, title, "imageUrl": productImage.asset->url }`;
        const data = await client.fetch<Product[]>(query);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filteredProducts, isLoading }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};