import { getCategories, getCategoryDetails } from "@frontline/services";
import { query } from "@frontline/libs/ApolloClient";
import { Category } from "@frontline/types";

jest.mock("@frontline/libs/ApolloClient", () => ({
  query: jest.fn(),
}));

const mockQuery = query as jest.Mock;

const mockCategories: Category[] = [
  { id: 1, name: "Electronics", image: "img1.jpg" },
  { id: 2, name: "Clothing", image: "img2.jpg" },
];

describe("getCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns categories when query succeeds", async () => {
    mockQuery.mockResolvedValue({ data: { categories: mockCategories } });

    const result = await getCategories();
    expect(result).toEqual(mockCategories);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({ query: expect.anything() })
    );
  });

  it("returns empty array when API returns empty categories", async () => {
    mockQuery.mockResolvedValue({ data: { categories: [] } });

    const result = await getCategories();
    expect(result).toEqual([]);
  });

  it("returns undefined when data is missing", async () => {
    mockQuery.mockResolvedValue({ data: undefined });

    const result = await getCategories();
    expect(result).toBeUndefined();
  });

  it("handles GraphQL error gracefully", async () => {
    console.error = jest.fn();
    mockQuery.mockRejectedValue(new Error("GraphQL Error"));

    const result = await getCategories();
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "GraphQL Error in getCategories:",
      expect.any(Error)
    );
  });
});

describe("getCategoryDetails", () => {
  it("returns category when query succeeds", async () => {
    mockQuery.mockResolvedValue({ data: { category: mockCategories[0] } });

    const result = await getCategoryDetails(1);
    expect(result).toEqual(mockCategories[0]);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { id: 1 },
      })
    );
  });

  it("returns undefined when data is missing", async () => {
    mockQuery.mockResolvedValue({ data: undefined });

    const result = await getCategoryDetails(1);
    expect(result).toBeUndefined();
  });

  it("handles GraphQL error gracefully", async () => {
    console.error = jest.fn();
    mockQuery.mockRejectedValue(new Error("GraphQL Error"));

    const result = await getCategoryDetails(1);
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "GraphQL Error in getCategoryDetails:",
      expect.any(Error)
    );
  });
});
