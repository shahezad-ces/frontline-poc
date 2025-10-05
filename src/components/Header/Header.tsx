"use client";
import { useCart } from "@frontline/context/CartContext";
import Image from "next/image";
import Link from "next/link";

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
      <div className="p-6 py-6 bg-yellow-400 relative">
        <Link href={"/cart"}>
          <Image
            src="/assets/images/cart.webp"
            width={35}
            height={35}
            alt="Cart"
            className=""
          />
          {totalItems > 0 && (
            <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
