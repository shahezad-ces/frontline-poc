"use client";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useCart } from "@frontline/context/CartContext";
import { ChangeEvent, MouseEvent as ReactMouseEvent } from "react";

type QuantitySelectorProps = {
  min?: number;
  max?: number;
};

export default function QuantitySelector({
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const { quantity, updateQuantity } = useCart();

  const handleQuantity = (
    e: ChangeEvent<HTMLInputElement> | ReactMouseEvent<HTMLButtonElement>,
    newQty: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQty < min || newQty > max) return;
    updateQuantity(newQty);
  };

  return (
    <div className="flex items-center border border-gray-200 rounded-lg w-full md:w-50">
      {/* Minus Button */}
      <button
        onClick={(e) => handleQuantity(e, quantity - 1)}
        className="w-20 h-10 p-2 flex items-center justify-center text-blue-600 text-2xl border-r border-gray-200 rounded-l-lg hover:bg-gray-200 cursor-pointer"
      >
        <MinusIcon className="w-6 h-6 disabled:text-gray-200" />
      </button>

      {/* Quantity Display */}
      <input
        type="number"
        value={quantity}
        onChange={(e) => handleQuantity(e, Number(e.target.value))}
        className="w-full text-center outline-none text-lg"
      />

      {/* Plus Button */}
      <button
        onClick={(e) => handleQuantity(e, quantity + 1)}
        className="w-20 h-10 p-2 flex items-center justify-center text-blue-600 text-2xl border-l border-gray-200 rounded-r-lg hover:bg-gray-200 cursor-pointer"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
