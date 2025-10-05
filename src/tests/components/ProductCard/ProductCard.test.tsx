import { fireEvent, screen } from "@testing-library/react";
import { Product } from "@frontline/types";
import "@testing-library/jest-dom";
import { ProductCard } from "@frontline/components";
import { renderWithProviders } from "@frontline/tests/RenderWithProviders";

const baseProduct: Product = {
  id: 1,
  title: "Classic Red Hoodie",
  price: 49.99,
  images: ["https://placehold.co/600x400"],
  category: { name: "Clothing", id: 1, image: "test" },
  description: "A stylish hoodie for everyday wear.",
};

describe("ProductCard", () => {
  it("renders product details correctly", () => {
    renderWithProviders(<ProductCard {...baseProduct} />);
    expect(screen.getByText(/Classic Red Hoodie/i)).toBeInTheDocument();
    expect(screen.getByText(/\$49.99/i)).toBeInTheDocument();
    expect(screen.getByText(/Clothing/i)).toBeInTheDocument();
  });

  it("renders image with correct src and alt", () => {
    renderWithProviders(<ProductCard {...baseProduct} />);
    const img = screen.getByTestId("product-image");
    expect(img).toHaveAttribute("src", baseProduct.images[0]);
    expect(img).toHaveAttribute("alt", baseProduct.title);
  });

  it("renders AddToCartButton", () => {
    renderWithProviders(<ProductCard {...baseProduct} />);
    expect(screen.getByTestId("add-to-cart")).toHaveTextContent(`Add to Cart`);
  });

  it("links to correct product page", () => {
    renderWithProviders(<ProductCard {...baseProduct} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/product/${baseProduct.id}`
    );
  });

  it("handles price as 0", () => {
    const productWithZeroPrice = { ...baseProduct, price: 0 };
    renderWithProviders(<ProductCard {...productWithZeroPrice} />);
    expect(screen.getByText(/\$0/i)).toBeInTheDocument();
  });

  it("adds product to cart when Add to Cart button is clicked", () => {
    renderWithProviders(<ProductCard {...baseProduct} />);

    const addToCartButton = screen.getByTestId("add-to-cart");
    expect(addToCartButton).toBeInTheDocument();

    fireEvent.click(addToCartButton);
    expect(screen.getByText(/Item added to the cart/i)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = renderWithProviders(
      <ProductCard {...baseProduct} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
