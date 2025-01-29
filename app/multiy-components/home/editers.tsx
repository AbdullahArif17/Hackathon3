import Image from "next/image";
import Link from "next/link";

export default function Editors() {
  return (
    <div className="px-4 md:px-6 py-14 overflow-hidden bg-[#FAFAFA]">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">EDITORS PICK</h2>
        <p className="text-gray-600">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Images Row */}
      <div className="flex justify-center flex-col md:flex-row lg:flex-row gap-4">
        {/* First Image: Wider */}
        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <Link href={"/products"}>
          <Image
            src="/first-1.png"
            alt="Wide Image"
            width={350}
            height={400}
            className="w-full md:w-[350px] lg:w-[400px] h-auto md:h-[400px] lg:h-[400px] object-cover"
          />
          </Link>
        </div>

        {/* Second Image: Square, with responsive width and height */}
        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <Link href={"/products"}>
          <Image
            src="/second.png"
            alt="Square Image"
            width={250}
            height={400}
            className="w-full md:w-[250px] lg:w-full h-auto md:h-[400px] lg:h-[400px] object-cover"
          />
          </Link>
        </div>

        {/* Third and Fourth Images: Rectangle */}
        <div className="flex flex-col gap-4">
          {/* Third Image */}
          <div className="w-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <Link href={"/products"}>
            <Image
              src="/third.png"
              alt="Rectangle Image"
              width={200}
              height={250}
              className="w-full h-auto md:h-[180px] lg:h-[180px] object-cover"
            />
            </Link>
          </div>

          {/* Fourth Image */}
          <div className="w-full relative transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <Link href={"/products"}>
            <Image
              src="/four.png"
              alt="Rectangle Image"
              width={200}
              height={230}
              className="w-full h-auto md:h-[200px] lg:h-[200px] object-cover"
            />
            {/* Button over the image */}
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-[#404650] font-semibold py-2 px-6">
              Kids
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
