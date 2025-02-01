"use client";

import { Product } from "@/app/multiy-components/productlistpage/shop-cart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import Green_Header from "@/app/multiy-components/headers/green-header";
import Header from "@/app/multiy-components/headers/header";
import { useCart } from "../../cart/CartContext";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

const getProduct_fetching = async (id: string): Promise<Product | null> => {
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
  
  const product = await client.fetch(query, { id });
  return product || null;
};

export default function ProductDetail({ params }: ProductDetailProps) {
  const [post, setPost] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const id = params.id;

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const data = await getProduct_fetching(id);
        if (!data) {
          setError("Product not found.");
        } else {
          setPost(data);
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
  if (!post) return <div>Product not found.</div>;

  const handleAddToCart = () => {
    addToCart({
      id: post._id,
      heading: post.title,
      price: parseFloat(post.price?.toFixed(2) || "0"),
      image: post.imageUrl,
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:p-9">
          <div className="md:w-1/2 w-full flex flex-col py-10 gap-3 items-center md:justify-start">
            <Image src={post.imageUrl} alt={post.title} width={504} height={450} priority />
            <div className="flex gap-3 justify-start">
              <Image src={post.imageUrl} alt={post.title} width={100} height={75} />
              <Image src={post.imageUrl} alt={post.title} width={100} height={75} />
            </div>
          </div>

          <div className="md:w-1/2 w-full text-[#858585] space-y-4 flex flex-col justify-center font-sans font-semibold items-start md:justify-start px-9">
            <h1 className="text-2xl text-black">{post.title}</h1>
            <p className="flex text-yellow-500 gap-2 items-center">
              <IoMdStar size={20} />
              <IoMdStar size={20} />
              <IoMdStar size={20} />
              <IoMdStar size={20} />
              <FaRegStar />
              <span className="text-black">10 Reviews</span>
            </p>
            <div className="font-bold font-serif text-2xl text-black">
              {post.price && post.discountPercentage ? (
                <>
                  <p className="text-lg text-gray-400 line-through">${post.price.toFixed(2)}</p>
                  <p className="text-lg text-red-500">
                    ${((post.price * (100 - post.discountPercentage)) / 100).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-lg text-green-800">${post.price?.toFixed(2)}</p>
              )}
            </div>
            <p>Availability: <span>10</span></p>
            <p className="border-b border-gray-500 pb-4">{post.description}</p>

            <div className="flex gap-5 py-4 items-center">
              <Button onClick={handleAddToCart} className="bg-blue-500 py-6 px-9 text-md rounded-[8px] text-white hover:bg-blue-400">
                <PiShoppingCartSimpleThin /> Add Item to Cart
              </Button>
              <CiHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}