import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductsPage from "@frontline/app/products/page";
import { getProducts, getCategoryDetails } from "@frontline/services";

// Mock services
jest.mock("@frontline/services", () => ({
  getProducts: jest.fn(),
  getCategoryDetails: jest.fn(),
}));

// Mock child components to avoid client-side hook issues
jest.mock("@frontline/components", () => ({
  Categories: () => <div data-testid="categories">Categories Component</div>,
  ProductsFilters: () => <div data-testid="filters">Filters Component</div>,
  PaginationWrapper: () => (
    <div data-testid="pagination">Pagination Component</div>
  ),
  ProductCard: ({ title }: any) => <div>{title}</div>,
}));

const mockGetProducts = getProducts as jest.Mock;
const mockGetCategoryDetails = getCategoryDetails as jest.Mock;

const mockProducts = [
  { id: 1, title: "Product 1" },
  { id: 2, title: "Product 2" },
];

describe("ProductsPage (Server Component)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles categoryId provided but category details not found", async () => {
    mockGetProducts.mockResolvedValue(mockProducts);
    mockGetCategoryDetails.mockResolvedValue(null);

    const ui = await ProductsPage({ searchParams: { categoryId: "99" } });
    const { asFragment } = render(ui);

    // Category name should NOT appear
    expect(screen.queryByText(/Electronics/i)).not.toBeInTheDocument();

    // Products should render
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
