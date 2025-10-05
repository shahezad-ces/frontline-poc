import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { ApolloWrapper } from "@frontline/libs/ApolloWrapper";
import { CartProvider } from "@frontline/context/CartContext";

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloWrapper>
      <CartProvider>{children}</CartProvider>
    </ApolloWrapper>
  );
};

export const renderWithProviders = (ui: ReactNode, options = {}) =>
  render(<AllProviders>{ui}</AllProviders>, options);
