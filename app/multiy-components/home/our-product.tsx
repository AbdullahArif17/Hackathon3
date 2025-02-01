import { client } from "@/sanity/lib/client";
import JustForYou, { Product } from "../productlistpage/shop-cart";
import { Key } from "react";
import Link from "next/link";



const getProduct = async () => {
  const query = `*[_type == "product"][0...12] {
     _id,
    title,
      description,
      "imageUrl": productImage.asset->url,
       price,
      tags,
       dicountPercentage,
      isNew
   }`

  // Fetch data from Sanity API
  const data: Product[] = await client.fetch(query);
  return data;
};

export default async function Our_Product() {
  const data = await getProduct();
  console.log(data);
  return (

    <main className="overflow-hidden">
      {/* Section Browse The Range */}
      <div className="my-20 text-[#1d1d1d]">

        {/* Section Our Products */}
        <div>
          <p className="text-lg text-center font-sans font-semibold text-[#5e5d5d]">Featured Products</p>
          <h1 className="text-3xl text-center font-sans font-bold my-5">BESTSELLER PRODUCTS</h1>
          <p className="text-lg text-center font-sans font-semibold text-[#5e5d5d] px-3">Problems trying to resolve the conflict between</p>

          {/* Section five */}
          <div className="flex justify-center py-5 bg-white m-10">
            <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-8">
              {data.map((product: Product, index: Key | null | undefined) => (
                <Link key={index} href={`/products/${product._id}`}>
                  <div>
                    {/* Pass props to JustForYou component */}
                    <JustForYou
                      _id={product._id}
                      title={product.title}
                      description={product.description}
                      imageUrl={product.imageUrl}
                      price={product.price}
                      discountPercentage={product.discountPercentage}
                      tags={product.tags}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
