"use client";

import React from "react";
import Image from "next/image";

export interface Product {

  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  tags: string[];
  dicountPercentage?: number;
  isNew?: boolean; // New Badge is optional
}

export default function JustForYou({
  title,
  description,
  imageUrl,
  price,
  dicountPercentage,
  tags
}: Product) {
  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-center bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200">
      {/* Product Image */}
      <div className="w-full flex justify-center items-center">
        <Image
          src={imageUrl}
          alt={title}
          width={238}
          height={300}
          className="w-full h-[300px] object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-2 justify-center items-center m-0 py-4 px-4">
        {/* Product Title */}
        <h3 className="text-lg font-serif font-semibold text-gray-800 ">{title}</h3>

        {/* Product Description */}
        <p className="text-md text-gray-600">
          {description.length > 150
            ? `${description.slice(0, 150)}...`
            : description}
        </p>
        <div className="flex items-center gap-5">
          {price && dicountPercentage ? (
            <>
              {/* Original price with strikethrough */}
              <p className="text-lg text-gray-400 line-through">
                ${price.toFixed(2)}
              </p>

              {/* Discounted price */}
              <p className="text-lg text-red-500">
                ${((price * (100 - dicountPercentage)) / 100).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-lg text-green-800">
              ${price?.toFixed(2)} {/* Show original price if no discount */}
            </p>
          )}
        </div>


        {/* Color Options */}
        <div className="flex gap-4 mt-4">
          <p className="w-6 h-6 rounded-full bg-blue-500"></p>
          <p className="w-6 h-6 rounded-full bg-[#23856D]"></p>
          <p className="w-6 h-6 rounded-full bg-[#E77C40]"></p>
          <p className="w-6 h-6 rounded-full bg-[#252B42]"></p>
        </div>
        <p className="from-neutral-700 underline">${tags}</p>
      </div>
    </div>
  );
}
