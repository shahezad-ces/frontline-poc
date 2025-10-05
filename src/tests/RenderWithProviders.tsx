import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { CartProvider } from "@frontline/context/CartContext";
import { MockedProvider } from "@apollo/client/testing/react";

export const renderWithProviders = (ui: ReactNode, { mocks = [] } = {}) => {
  return render(
    <MockedProvider mocks={mocks}>
      <CartProvider>{ui}</CartProvider>
    </MockedProvider>
  );
};
