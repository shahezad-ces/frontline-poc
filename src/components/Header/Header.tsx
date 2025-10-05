"use client";
import { useCart } from "@frontline/context/CartContext";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="bg-blue-800 text-white pl-6 shadow flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Link href={"/"} className="text-4xl font-bold">
            FrontLine
          </Link>
        </div>
      </div>
      <div className="p-4 py-4 bg-yellow-400 relative">
        <Link href={"/cart"}>
          <ShoppingCartIcon className="w-10 h-10" />
          {totalItems > 0 && (
            <span
              data-testid="cart-count"
              className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
