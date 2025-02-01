"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams instead of destructuring directly
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/multiy-components/productlistpage/shop-cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import Green_Header from "@/app/multiy-components/headers/green-header";
import Header from "@/app/multiy-components/headers/header";
import { useCart } from "../../cart/CartContext";

const getProduct = async (id: string): Promise<Product | null> => {
  if (!id) return null; // ✅ Ensure ID is valid before querying
  
  const query = `*[_type == "product" && _id == $id][0] {  
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
    return await client.fetch(query, { id });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export default function ProductDetail() {
  const params = useParams(); // ✅ Correct way to get dynamic route params in Next.js 13+
  const id = params?.id as string; // ✅ Ensure id is treated as a string
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        setLoading(true);
        const data = await getProduct(id);

        if (!data) {
          setError("Product not found.");
          setProduct(null);
        } else {
          setProduct(data);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to fetch product data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <div className="h-[600px] text-center mt-20 font-bold text-3xl font-serif">Loading...</div>;
  if (error) return <div className="h-[600px] text-center mt-20 font-bold text-3xl font-serif text-red-500">{error}</div>;
  if (!product) return <div>Product not found.</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      heading: product.title,
      price: parseFloat(product.price?.toFixed(2) || "0"),
      image: product.imageUrl,
      quantity: 1,
      selectedColor: "Blue",
      selectedSize: "M",
    });
  };

  return (
    <div>
      <Green_Header />
      <Header />
      <div className="flex flex-col font-sans font-semibold bg-[#FAFAFA] gap-0">
        <div className="p-7">
          <p>Product Details</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:p-9">
          <div className="md:w-1/2 w-full flex flex-col py-10 gap-3 items-center md:justify-start">
            <Image src={product.imageUrl} alt={product.title} width={504} height={450} priority />
          </div>

          <div className="md:w-1/2 w-full text-[#858585] space-y-4 flex flex-col justify-center font-sans font-semibold items-start md:justify-start px-9">
            <h1 className="text-2xl text-black">{product.title}</h1>
            <div className="font-bold font-serif text-2xl text-black">
              {product.price && product.discountPercentage ? (
                <>
                  <p className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</p>
                  <p className="text-lg text-red-500">
                    ${((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-lg text-green-800">${product.price?.toFixed(2)}</p>
              )}
            </div>
            <p className="border-b border-gray-500 pb-4">{product.description}</p>

            <div className="flex gap-5 py-4 items-center">
              <Button onClick={handleAddToCart} className="bg-blue-500 py-6 px-9 text-md rounded-[8px] text-white hover:bg-blue-400">
                <PiShoppingCartSimpleThin /> Add Item to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
