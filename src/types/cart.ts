import { Product } from "./product";

export type CartItem = Product & { quantity: number };

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  quantity: number;
};
