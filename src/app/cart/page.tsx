"use client";
import { getLocalStorage } from "@frontline/utils";
import { CartItem } from "@frontline/types";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import QuantitySelector from "@frontline/stories/QuantitySelector/QuantitySelector";
import { useCart } from "@frontline/context/CartContext";
import Button from "@frontline/stories/Button/Button";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/20/solid";

const CartPage = () => {
  const { cart, totalPrice, removeFromCart } = useCart();

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getImageURL = (imageUrl: string) =>
    imageUrl && isValidUrl(imageUrl)
      ? imageUrl
      : "/assets/images/placeholder.jpg";

  const handleRemoveItemFromCart = (
    e: MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(productId);
  };

  return (
    <div className="container mx-auto px-4 my-6 sm:px-6 lg:px-8 gap-6">
      <h1 className="text-3xl mb-4 font-bold text-gray-800">My Cart</h1>
      <div className="flex flex-col lg:flex-row gap-2 md:gap-6">
        {/* Cart Items */}

        {!!cart.length ? (
          <div className="w-full lg:w-[65%] flex flex-col gap-2 md:gap-6 bg-white border border-gray-200 rounded-lg p-2 md:p-4">
            {cart?.map((item) => (
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                className="border border-gray-200 shadow rounded-lg p-2 md:p-4 flex items-start flex-col md:flex-row gap-2 md:gap-6"
              >
                <div className="flex items-start flex-col md:flex-row gap-2 md:gap-6 w-full">
                  <Image
                    placeholder="blur"
                    blurDataURL="/assets/images/placeholder.jpg"
                    src={getImageURL(item?.images?.[0])}
                    width={100}
                    height={100}
                    alt={item.title}
                    objectFit="cover"
                    className="w-full md:w-42 h-32 md:h-42 object-cover rounded-md"
                  />
                  <div className="space-y-1">
                    <h2 className="text-l font-semibold text-gray-800 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {item?.category?.name}
                    </p>
                    <p className="text-xl text-red-600 font-semibold">
                      ${item?.price}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col self-center gap-2 md:gap-4">
                  <QuantitySelector min={1} max={10} />
                  <Button
                    variant="danger"
                    className="rounded-lg"
                    onClick={(e) => handleRemoveItemFromCart(e, item.id)}
                  >
                    <div className="flex gap-1 item-center justify-center">
                      <TrashIcon className="w-6 h-6" />
                      Remove
                    </div>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full lg:w-[65%] flex flex-col bg-white border border-gray-200 rounded-lg p-2 md:p-8 justify-center text-center">
            <p className="text-2xl font-semibold text-gray-800">
              Your cart is empty
            </p>
            <p className="text-l text-gray-800">
              Add products you want to buy later here
            </p>
            <Link href={"/"}>
              <Button className="w-fit mt-3">See Offers</Button>
            </Link>
          </div>
        )}
        {/* Cart Checkout */}
        {!!cart.length && (
          <div className="w-full lg:w-[35%] space-y-4 bg-white border border-gray-200 rounded-lg p-3 md:p-4 h-fit">
            <h2 className="text-l md:text-xl font-semibold text-gray-800">
              Summary of your purchase
            </h2>
            <div className="border border-gray-200 rounded-lg p-2 space-y-1">
              <div className="flex justify-between">
                <p>Subtotal ({cart?.length} products)</p>
                <p>${totalPrice}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p>$0</p>
              </div>
              <div className="flex justify-between">
                <p>Shipment</p>
                <p>Free</p>
              </div>
            </div>
            <div className="bg-neutral-100 flex justify-between items-center border border-gray-200 rounded-lg p-2 space-y-1 mt-1">
              <p className="font-semibold">Total cash (VAT included)</p>
              <p className="font-semibold">${totalPrice}</p>
            </div>
            <Button className="w-full" disabled={!cart.length}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
