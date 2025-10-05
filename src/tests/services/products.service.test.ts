import { getProducts, getProductDetails } from "@frontline/services";
import { query } from "@frontline/libs/ApolloClient";
import { Product } from "@frontline/types";

jest.mock("@frontline/libs/ApolloClient", () => ({
  query: jest.fn(),
}));

const mockQuery = query as jest.Mock;

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    images: ["img1.jpg"],
    category: { id: 1, name: "Category 1", image: "cat.jpg" },
    description: "Description 1",
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    images: ["img2.jpg"],
    category: { id: 2, name: "Category 2", image: "cat2.jpg" },
    description: "Description 2",
  },
];

describe("getProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns products when query succeeds", async () => {
    mockQuery.mockResolvedValue({ data: { products: mockProducts } });

    const result = await getProducts({ categoryId: 1 });
    expect(result).toEqual(mockProducts);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({ categoryId: 1 }),
      })
    );
  });

  it("returns empty array when API returns empty products", async () => {
    mockQuery.mockResolvedValue({ data: { products: [] } });

    const result = await getProducts({});
    expect(result).toEqual([]);
  });

  it("returns undefined when data is missing", async () => {
    mockQuery.mockResolvedValue({ data: undefined });

    const result = await getProducts({});
    expect(result).toBeUndefined();
  });

  it("handles GraphQL error gracefully", async () => {
    console.error = jest.fn();
    mockQuery.mockRejectedValue(new Error("GraphQL Error"));

    const result = await getProducts({});
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "GraphQL Error in getProducts:",
      expect.any(Error)
    );
  });

  it("passes optional params correctly", async () => {
    mockQuery.mockResolvedValue({ data: { products: mockProducts } });

    await getProducts({ price: 100, price_min: 50, price_max: 150 });
    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({
          price: 100,
          price_min: 50,
          price_max: 150,
        }),
      })
    );
  });
});

describe("getProductDetails", () => {
  it("returns product when query succeeds", async () => {
    mockQuery.mockResolvedValue({ data: { product: mockProducts[0] } });

    const result = await getProductDetails(1);
    expect(result).toEqual(mockProducts[0]);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { id: 1 },
      })
    );
  });

  it("returns undefined when data is missing", async () => {
    mockQuery.mockResolvedValue({ data: undefined });

    const result = await getProductDetails(1);
    expect(result).toBeUndefined();
  });

  it("handles GraphQL error gracefully", async () => {
    console.error = jest.fn();
    mockQuery.mockRejectedValue(new Error("GraphQL Error"));

    const result = await getProductDetails(1);
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "GraphQL Error:",
      expect.any(Error)
    );
  });
});
