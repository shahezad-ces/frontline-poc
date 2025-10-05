"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "@frontline/utils";
import type { CartContextType, CartItem, Product } from "@frontline/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Load from localStorage
  useEffect(() => {
    const storedCart = getLocalStorage<CartItem[]>("cart");
    if (storedCart) setCart(storedCart);
  }, []);

  // Save to localStorage
  useEffect(() => {
    setLocalStorage("cart", cart);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setQuantity(1);
  };

  const updateQuantity = (quantity: number) => {
    if (quantity < 1) return; // Prevent zero or negative
    setQuantity(quantity);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        quantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
