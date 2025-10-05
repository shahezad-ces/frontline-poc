import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductDetailPage from "@frontline/app/product/[id]/page";
import { getProductDetails } from "@frontline/services";

// Mock services
jest.mock("@frontline/services", () => ({
  getProductDetails: jest.fn(),
}));

// Mock child components to avoid client-side hook issues
jest.mock("@frontline/components", () => ({
  AddToCartButton: ({ product }: any) => (
    <button data-testid="add-to-cart">Add to Cart</button>
  ),
}));

jest.mock("@frontline/stories", () => ({
  Image: ({ src, alt }: any) => (
    <img src={src} alt={alt} data-testid="product-image" />
  ),
  QuantitySelector: () => (
    <div data-testid="quantity-selector">Quantity Selector</div>
  ),
}));

const mockGetProductDetails = getProductDetails as jest.Mock;

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 199.99,
  images: ["https://placehold.co/600x400"],
  category: { id: 1, name: "Electronics", image: "cat.jpg" },
  description: "A great product for testing.",
};

describe("ProductDetailPage (Server Component)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product details when data is available", async () => {
    mockGetProductDetails.mockResolvedValue(mockProduct);

    const ui = await ProductDetailPage({ params: Promise.resolve({ id: 1 }) });
    render(ui);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/\$199.99/i)).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      mockProduct.images[0]
    );
    expect(screen.getByTestId("quantity-selector")).toBeInTheDocument();
    expect(screen.getByTestId("add-to-cart")).toBeInTheDocument();
  });

  it("displays error message when product details are missing", async () => {
    mockGetProductDetails.mockResolvedValue(undefined);

    const ui = await ProductDetailPage({ params: Promise.resolve({ id: 1 }) });
    render(ui);

    expect(
      screen.getByText(
        /Failed to load product details. Please try again later./i
      )
    ).toBeInTheDocument();
  });

  it("matches snapshot", async () => {
    mockGetProductDetails.mockResolvedValue(mockProduct);

    const ui = await ProductDetailPage({ params: Promise.resolve({ id: 1 }) });
    const { asFragment } = render(ui);
    expect(asFragment()).toMatchSnapshot();
  });
});
