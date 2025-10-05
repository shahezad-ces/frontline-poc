"use client";
import { useCart } from "@frontline/context/CartContext";
import Button from "@frontline/stories/Button/Button";
import Toast from "@frontline/stories/Toast/Toast";
import { Product } from "@frontline/types/product";
import { MouseEvent, useState } from "react";

export default function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const triggerAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setShowToast(true);
  };

  return (
    <>
      <Button onClick={triggerAddToCart} className={className}>
        Add to Cart
      </Button>
      {showToast && (
        <Toast
          message={"Item added to the cart"}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
