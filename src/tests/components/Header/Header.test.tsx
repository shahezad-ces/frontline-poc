import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@frontline/components";
import { renderWithProviders } from "@frontline/tests/RenderWithProviders";

jest.mock("@frontline/context/CartContext", () => {
  const originalModule = jest.requireActual("@frontline/context/CartContext");
  return {
    ...originalModule,
    useCart: jest.fn(),
  };
});

const mockUseCart = require("@frontline/context/CartContext").useCart;

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders brand name and cart icon", () => {
    mockUseCart.mockReturnValue({ totalItems: 0 });
    renderWithProviders(<Header />);
    expect(screen.getByText(/FrontLine/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /FrontLine/i })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("does not show cart count when totalItems = 0", () => {
    mockUseCart.mockReturnValue({ totalItems: 0 });
    renderWithProviders(<Header />);
    expect(screen.queryByTestId("cart-count")).not.toBeInTheDocument();
  });

  it("shows cart count when totalItems > 0", () => {
    mockUseCart.mockReturnValue({ totalItems: 5 });
    renderWithProviders(<Header />);
    const badge = screen.getByTestId("cart-count");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("5");
  });

  it("matches snapshot", () => {
    mockUseCart.mockReturnValue({ totalItems: 2 });
    const { asFragment } = renderWithProviders(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
