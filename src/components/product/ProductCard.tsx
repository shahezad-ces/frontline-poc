"use client";

import { Product } from "@frontline/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = (props: Product) => {
  const { title, price, description, images, category, id } = props;
  const [imgSrc, setImgSrc] = useState(images[0]);

  return (
    <Link
      href={`/product/${id}`}
      className="text-blue-800 font-semibold capitalize hover:underline"
    >
      <div className="bg-white shadow border border-gray-200 rounded-lg">
        <Image
          placeholder="blur"
          blurDataURL="/assets/images/placeholder.jpg"
          src={imgSrc}
          width={500}
          height={500}
          alt={title}
          objectFit="cover"
          onError={() => setImgSrc("/assets/images/placeholder.jpg")}
          className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-t-md"
        />
        <div className="p-4">
          <h2 className="text-l font-semibold text-gray-800 line-clamp-2 h-15">
            {title}
          </h2>
          <p className="text-sm text-gray-400">{category.name}</p>
          <p className="text-xl text-red-600 font-semibold mt-1">${price}</p>
          <p className="text-sm text-black mt-1 line-clamp-2 mb-3 h-10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <button className="w-full rounded-full bg-blue-800 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-blue-700">
            Add To Card
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
