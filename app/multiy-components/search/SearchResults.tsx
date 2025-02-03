"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@/components/ui/Skeleton";
import Footer from "../footer-2";
import Header from "../headers/header";

interface Product {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  tags: string[];
  discountPercentage?: number;
  isNew?: boolean; // New Badge is optional
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      async function fetchData() {
        setLoading(true);
        setError(null);
        try {
          const searchQuery = `*[_type == "product" && title match $query] {
            _id,
            title,
            "imageUrl": productImage.asset->url,
            price
          }`;

          // ✅ Correct parameter structure
          const params: Record<string, string> = { query: `${query}*` };
          const results = await client.fetch<Product[]>(searchQuery, params);
          setProducts(results);
        } catch (error) {
          setError(error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
          setLoading(false);
        }
      }

      const debounceTimer = setTimeout(() => {
        fetchData();
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-64 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
	<div className="w-full max-w-sm flex flex-col items-center justify-center bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200">
		<Header />
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                 <div className="w-full flex justify-center items-center">
						<Image
						  src={product.imageUrl}
						  alt={product.title}
						  width={238}
						  height={300}
						  className="w-full h-[300px] object-cover"
						/>
					  </div>
				
                <h2 className="text-xl font-bold mt-4">{product.title}</h2>
                <p className="text-lg font-extrabold mt-2">${product.price?.toFixed(2)}</p>
				<p className="text-neutral-700 underline">${product.tags}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found for "{query}".</p>
      )}
	  <Footer />
    </div>
  );
}