import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Product } from "@frontline/types";
import { AddToCartButton } from "@frontline/components";

jest.mock("@frontline/context/CartContext", () => ({
  useCart: jest.fn(),
}));

const mockUseCart = require("@frontline/context/CartContext").useCart;

const mockProduct: Product = {
  id: 1,
  title: "Classic Red Hoodie",
  price: 49.99,
  images: ["https://placehold.co/600x400"],
  category: { id: 1, name: "Clothing", image: "test" },
  description: "A stylish hoodie for everyday wear.",
};

describe("AddToCartButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders button with correct text", () => {
    mockUseCart.mockReturnValue({ addToCart: jest.fn() });
    render(<AddToCartButton product={mockProduct} />);
    expect(screen.getByTestId("add-to-cart")).toHaveTextContent("Add to Cart");
  });

  it("calls addToCart when clicked", () => {
    const addToCartMock = jest.fn();
    mockUseCart.mockReturnValue({ addToCart: addToCartMock });

    render(<AddToCartButton product={mockProduct} />);
    const button = screen.getByTestId("add-to-cart");

    fireEvent.click(button);
    expect(addToCartMock).toHaveBeenCalledTimes(1);
    expect(addToCartMock).toHaveBeenCalledWith(mockProduct);
  });

  it("shows toast after adding to cart", () => {
    mockUseCart.mockReturnValue({ addToCart: jest.fn() });

    render(<AddToCartButton product={mockProduct} />);
    fireEvent.click(screen.getByTestId("add-to-cart"));

    expect(screen.getByText(/Item added to the cart/i)).toBeInTheDocument();
  });

  it("hides toast after 3 seconds", () => {
    mockUseCart.mockReturnValue({ addToCart: jest.fn() });

    render(<AddToCartButton product={mockProduct} />);
    fireEvent.click(screen.getByTestId("add-to-cart"));

    expect(screen.getByText(/Item added to the cart/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(
      screen.queryByText(/Item added to the cart/i)
    ).not.toBeInTheDocument();
  });

  it("matches snapshot", () => {
    mockUseCart.mockReturnValue({ addToCart: jest.fn() });
    const { asFragment } = render(<AddToCartButton product={mockProduct} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
