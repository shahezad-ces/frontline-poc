import { render, screen } from "@testing-library/react";
import RootLayout from "@frontline/app/layout";

jest.mock("@frontline/libs/ApolloWrapper", () => ({
  ApolloWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="apollo-wrapper">{children}</div>
  ),
}));

jest.mock("@frontline/context/CartContext", () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cart-provider">{children}</div>
  ),
}));

jest.mock("@frontline/components/Header/Header", () => () => (
  <div data-testid="header">Header Component</div>
));

jest.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

describe("RootLayout", () => {
  it("renders children inside providers", () => {
    render(
      <RootLayout>
        <div data-testid="child">Test Child</div>
      </RootLayout>,
      { container: document.documentElement }
    );

    expect(screen.getByTestId("apollo-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("cart-provider")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies global font classes and layout structure", () => {
    render(
      <RootLayout>
        <div>Sample</div>
      </RootLayout>,
      { container: document.documentElement }
    );

    const html = document.querySelector("html");
    const body = document.querySelector("body");

    expect(html).toHaveAttribute("lang", "en");
    expect(body?.className).toContain("antialiased");
    expect(body?.className).toContain("--font-geist-sans");
  });
});
