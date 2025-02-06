"use client";

import Header from "@/app/multiy-components/headers/header";
import Footer from "@/app/multiy-components/footer-2";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "./CartContext";

// Mapping for colors
const colorNames: Record<string, string> = {
  "bg-myBlue": "Blue",
  "bg-myDarkGreen": "Green",
  "bg-myOrange": "Orange",
  "bg-myDark": "Dark",
};

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  // const { addToWishlist } = useWishlist(); // Access Wishlist Context

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // const handleAddToWishlist = (item: any) => {
  //   addToWishlist(item); // Add item to wishlist
  // };

  return (
    <div className="">
      <Header />
      <h1 className="text-4xl font-bold my-6 text-center hover:underline text-myDarkOrange">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-2xl text-slate-700 text-center font-semibold ">Your Cart is Empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center border p-4 rounded-lg space-y-4 md:space-y-0 md:space-x-6"
            >
              <Image
                src={urlFor(item.image).url()}
                alt={item.heading}
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-semibold text-lg">{item.heading}</h2>
                <p className="text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
                <p className="font-bold text-gray-800">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
                {/* Display the selected color and size */}
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Color:</strong>{" "}
                  {colorNames[item.selectedColor] || "Not selected"}
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  <strong>Size:</strong> {item.selectedSize || "Not selected"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
              {/* <button
                onClick={() => handleAddToWishlist(item)} // Add to wishlist
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to Wishlist
              </button> */}
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </div >
      )}
      <Footer />
    </div>
  );
};

export default CartPage