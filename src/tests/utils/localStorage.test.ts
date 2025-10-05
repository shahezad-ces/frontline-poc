import { getLocalStorage, setLocalStorage } from "@frontline/utils";

describe("localStorage utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("saves and retrieves data successfully", () => {
    const key = "testKey";
    const value = { name: "John", age: 30 };

    setLocalStorage(key, value);
    const result = getLocalStorage<typeof value>(key);

    expect(result).toEqual(value);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
  });

  it("returns null when key does not exist", () => {
    const result = getLocalStorage("nonExistentKey");
    expect(result).toBeNull();
  });

  it("handles invalid JSON in localStorage gracefully", () => {
    const key = "invalidJSON";
    localStorage.setItem(key, "{invalid-json}");

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const result = getLocalStorage(key);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      `Error reading ${key} from localStorage:`,
      expect.any(SyntaxError)
    );

    consoleSpy.mockRestore();
  });

  it("handles error during setLocalStorage (e.g., storage full)", () => {
    const key = "testKey";
    const value = { name: "John" };

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    setLocalStorage(key, value);

    expect(consoleSpy).toHaveBeenCalledWith(
      `Error saving ${key} to localStorage:`,
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
