"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/multiy-components/productlistpage/shop-cart";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@/components/ui/Skeleton";

// Function to search products in Sanity
const searchProducts = async (query: string): Promise<Product[]> => {
  if (!query) return [];

  const searchQuery = `*[_type == "product" && lower(title) match $query] {
    _id,
    title,
    description,
    "imageUrl": productImage.asset->url,
    price,
    tags,
    discountPercentage,
    isNew
  }`;

  try {
    // Correct parameter passing with explicit typing
    const params: Record<string, unknown> = { query: `${query.toLowerCase()}*` };
    return await client.fetch<Product[]>(searchQuery, params);
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error("Failed to fetch products. Please try again later.");
  }
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);

      // Clear previous debounce
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        try {
          const data = await searchProducts(query);
          setProducts(data);
        } catch (error) {
          setError(error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
          setLoading(false);
        }
      }, 300); // Debounce delay

      return () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
      };
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <Skeleton className="w-full h-48 rounded-t-lg" aria-hidden="true" />
              <Skeleton className="w-3/4 h-6 mt-2" />
              <Skeleton className="w-full h-4 mt-2" />
              <Skeleton className="w-1/2 h-4 mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
        <p className="text-red-500">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                  priority
                />
                <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold mt-2">${product.price?.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found for "{query}".</p>
      )}
    </div>
  );
}
