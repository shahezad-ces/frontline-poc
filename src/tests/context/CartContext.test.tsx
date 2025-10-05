import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@frontline/context/CartContext";
import { getLocalStorage, setLocalStorage } from "@frontline/utils";
import { Product } from "@frontline/types";

jest.mock("@frontline/utils", () => ({
  getLocalStorage: jest.fn(),
  setLocalStorage: jest.fn(),
}));

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 100,
  images: ["img.jpg"],
  category: { id: 1, name: "Category", image: "cat.jpg" },
  description: "Description",
};

describe("CartContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("loads initial cart from localStorage", () => {
    (getLocalStorage as jest.Mock).mockReturnValue([
      { ...mockProduct, quantity: 0 },
    ]);
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([{ ...mockProduct, quantity: 0 }]);
  });

  it("adds a new product to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct));
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it("increases quantity if product already exists", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct));
    act(() => result.current.addToCart(mockProduct));
    expect(result.current.cart[0].quantity).toBe(2);
  });

  it("updates quantity correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.updateQuantity(3));
    act(() => result.current.addToCart(mockProduct));
    expect(result.current.cart[0].quantity).toBe(3);
  });

  it("ignores invalid quantity updates", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.updateQuantity(0));
    act(() => result.current.addToCart(mockProduct));
    expect(result.current.cart[0].quantity).toBe(1); // default reset
  });

  it("removes product from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct));
    act(() => result.current.removeFromCart(mockProduct.id));
    expect(result.current.cart).toHaveLength(0);
  });

  it("clears the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct));
    act(() => result.current.clearCart());
    expect(result.current.cart).toHaveLength(0);
  });

  it("calculates totalItems and totalPrice correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.updateQuantity(2));
    act(() => result.current.addToCart(mockProduct));
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(200);
  });

  it("persists cart to localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct));
    expect(setLocalStorage).toHaveBeenCalledWith("cart", result.current.cart);
  });

  it("throws error if useCart is used outside CartProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useCart();
      } catch (e) {
        return e;
      }
    });
    expect(result.current).toEqual(
      new Error("useCart must be used within CartProvider")
    );
  });
});
