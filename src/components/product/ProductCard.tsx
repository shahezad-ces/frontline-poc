"use client";

import { Product } from "@frontline/types/product";
import Image from "next/image";
import { useState } from "react";

const ProductCard = (props: Product) => {
  const { title, price, description, images, category } = props;
  const [imgSrc, setImgSrc] = useState(images[0]);

  return (
    <div className="bg-white shadow rounded-lg">
      <Image
        placeholder="blur"
        blurDataURL="/assets/images/placeholder.jpg"
        src={imgSrc}
        width={500}
        height={500}
        alt={title}
        objectFit="cover"
        onError={() => setImgSrc("/assets/images/placeholder.jpg")}
        style={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>
        <p className="text-black-600 font-bold mt-1">${price}</p>
        <p className="text-lg font-semibold text-black-600 mt-1">
          {category.name}
        </p>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
