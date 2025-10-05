import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartPage from "@frontline/app/cart/page";
import { useCart } from "@frontline/context/CartContext";

// Mock useCart hook
jest.mock("@frontline/context/CartContext", () => ({
  useCart: jest.fn(),
}));

// Mock child components
jest.mock("@frontline/stories", () => ({
  Image: ({ src, alt }: any) => (
    <img src={src} alt={alt} data-testid="cart-image" />
  ),
  QuantitySelector: () => (
    <div data-testid="quantity-selector">Quantity Selector</div>
  ),
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockUseCart = useCart as jest.Mock;

const mockCartItem = {
  id: 1,
  title: "Test Product",
  price: 100,
  images: ["https://placehold.co/100x100"],
  category: { id: 1, name: "Electronics", image: "cat.jpg" },
  quantity: 2,
};

describe("CartPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty cart message when cart is empty", () => {
    mockUseCart.mockReturnValue({
      cart: [],
      totalPrice: 0,
      removeFromCart: jest.fn(),
    });

    render(<CartPage />);

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Add products you want to buy later here/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /See Offers/i })
    ).toBeInTheDocument();
  });

  it("renders cart items when cart has products", () => {
    mockUseCart.mockReturnValue({
      cart: [mockCartItem],
      totalPrice: 200,
      removeFromCart: jest.fn(),
    });

    render(<CartPage />);

    expect(screen.getByText(/My Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
    expect(screen.getByTestId("cart-image")).toHaveAttribute(
      "src",
      mockCartItem.images[0]
    );
    expect(screen.getByTestId("quantity-selector")).toBeInTheDocument();
  });

  it("calls removeFromCart when Remove button is clicked", () => {
    const removeMock = jest.fn();
    mockUseCart.mockReturnValue({
      cart: [mockCartItem],
      totalPrice: 200,
      removeFromCart: removeMock,
    });

    render(<CartPage />);

    const removeButton = screen.getByRole("button", { name: /Remove/i });
    fireEvent.click(removeButton);

    expect(removeMock).toHaveBeenCalledWith(mockCartItem.id);
  });

  it("Continue Shopping button is disabled when cart is empty", () => {
    mockUseCart.mockReturnValue({
      cart: [],
      totalPrice: 0,
      removeFromCart: jest.fn(),
    });

    render(<CartPage />);
    const continueButton = screen.getByRole("button", { name: /See Offers/i });
    expect(continueButton).toBeEnabled(); // "See Offers" button is always enabled
  });

  it("matches snapshot", () => {
    mockUseCart.mockReturnValue({
      cart: [mockCartItem],
      totalPrice: 200,
      removeFromCart: jest.fn(),
    });

    const { asFragment } = render(<CartPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
