import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Categories } from "@frontline/components";
import { getCategories } from "@frontline/services";
import type { Category } from "@frontline/types";

jest.mock("@frontline/services", () => ({
  getCategories: jest.fn(),
}));

const mockGetCategories = getCategories as jest.Mock;

const mockCategories: Category[] = [
  { id: 1, name: "Electronics", image: "test" },
  { id: 2, name: "Clothing", image: "test" },
  { id: 3, name: "Books", image: "test" },
];

describe("Categories Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders categories list when API returns data", async () => {
    mockGetCategories.mockResolvedValue(mockCategories);

    render(await Categories({ selectedCategory: null }));

    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/Clothing/i)).toBeInTheDocument();
    expect(screen.getByText(/Books/i)).toBeInTheDocument();
  });

  it("handles empty categories array", async () => {
    mockGetCategories.mockResolvedValue([]);

    render(await Categories({ selectedCategory: null }));

    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("handles null or undefined response from API", async () => {
    mockGetCategories.mockResolvedValue(null);

    render(await Categories({ selectedCategory: null }));

    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("matches snapshot", async () => {
    mockGetCategories.mockResolvedValue(mockCategories);

    const { asFragment } = render(await Categories({ selectedCategory: null }));
    expect(asFragment()).toMatchSnapshot();
  });
});
