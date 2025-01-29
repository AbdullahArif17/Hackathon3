"use client";

import { Product } from "@/app/multiy-components/productlistpage/shop-cart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import Green_Header from "@/app/multiy-components/headers/green-header";
import Header from "@/app/multiy-components/headers/header";
import { useCart } from "../../cart/CartContext"; // Ensure you have a cart context set up

const getProduct_fetching = async () => {
  const query = `*[_type == "product"] {
    _id,
    title,
    description,
    "imageUrl": productImage.asset->url,
    price,
    tags,
    discountPercentage,
    isNew
  }`;
  return await client.fetch(query);
};

function ProductDetail() {
  const [posts, setPosts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { addToCart } = useCart(); // Access the cart context

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProduct_fetching();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const id = params?.id;
  const card = posts?.find((p) => p._id === id);

  if (loading) {
    return <div className="h-[600px] text-center mt-20 font-bold text-3xl font-serif">Loading...</div>;
  }

  if (!card) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: card._id,
      heading: card.title,
      price: parseFloat(card.price?.toFixed(2) || "0"),
      image: card.imageUrl,
      quantity: 1,
      selectedColor: "Blue", // Default or dynamic value
      selectedSize: "M", // Default or dynamic value
    });
  };

  return (
    <div>
      <Green_Header />
      <Header />
      {/* Section one */}
      <div className="flex flex-col font-sans font-semibold bg-[#FAFAFA] gap-0">
        {/* Breadcrumb */}
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

        {/* Product Details */}
        <div className="flex flex-col md:flex-row justify-center items-center md:p-9">
          <div className="md:w-1/2 w-full flex flex-col py-10 gap-3 items-center md:justify-start">
            <Image src={card.imageUrl} alt={card.title} width={504} height={450} />
            <div className="flex gap-3 justify-start">
              <Image src={card.imageUrl} alt={card.title} width={100} height={75} />
              <Image src={card.imageUrl} alt={card.title} width={100} height={75} />
            </div>
          </div>

          <div className="md:w-1/2 w-full text-[#858585] space-y-4 flex flex-col justify-center font-sans font-semibold items-start md:justify-start px-9">
            <h1 className="text-2xl text-black">{card.title}</h1>
            <p className="flex text-yellow-500 gap-2 items-center">
              <IoMdStar size={20} />
              <IoMdStar size={20} />
              <IoMdStar size={20} />
              <IoMdStar size={20} />
              <FaRegStar />
              <span className="text-black">10 Reviews</span>
            </p>
            <div className="font-bold font-serif text-2xl text-black">
              {card.price && card.dicountPercentage ? (
                <>
                  {/* Original price with strikethrough */}
                  <p className="text-lg text-gray-400 line-through">
                    ${card.price.toFixed(2)}
                  </p>

                  {/* Discounted price */}
                  <p className="text-lg text-red-500">
                    ${((card.price * (100 - card.dicountPercentage)) / 100).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-lg text-green-800">
                  ${card.price?.toFixed(2)} {/* Show original price if no discount */}
                </p>
              )}
            </div>
            <p>
              Availability: <span className="">10</span>
            </p>
            <p className="border-b border-gray-500 pb-4">
              {card.description.length > 400
                ? `${card.description.slice(0, 400)}.`
                : card.description}
            </p>
            <div className="flex gap-4 py-4">
              <div className="w-[30px] h-[30px] rounded-full bg-blue-500"></div>
              <div className="w-[30px] h-[30px] rounded-full bg-[#23856D]"></div>
              <div className="w-[30px] h-[30px] rounded-full bg-[#E77C40]"></div>
              <div className="w-[30px] h-[30px] rounded-full bg-[#252B42]"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-5 py-4 items-center">
              <Button
                className="bg-blue-500 py-6 px-9 text-md rounded-[8px] text-white hover:bg-white hover:text-black"
                onClick={handleAddToCart}
              >
                Add Item
              </Button>
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-12 h-12 border rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <PiShoppingCartSimpleThin className="text-gray-600" />
                </button>
                <CiHeart size={40} className="bg-white p-2 rounded-full text-black" />
                <IoEye size={30} className="bg-white p-2 rounded-full text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
