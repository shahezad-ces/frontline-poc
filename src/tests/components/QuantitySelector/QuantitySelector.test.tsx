import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useCart } from "@frontline/context/CartContext";
import { QuantitySelector } from "@frontline/stories";

// Mock useCart hook
jest.mock("@frontline/context/CartContext", () => ({
  useCart: jest.fn(),
}));

const mockUseCart = useCart as jest.Mock;

describe("QuantitySelector Component", () => {
  const updateQuantityMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCart.mockReturnValue({
      quantity: 5,
      updateQuantity: updateQuantityMock,
    });
  });

  it("renders with default quantity", () => {
    render(<QuantitySelector />);
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
  });

  it("increases quantity when plus button is clicked", () => {
    render(<QuantitySelector />);
    const plusButton = screen.getAllByRole("button")[1];
    fireEvent.click(plusButton);
    expect(updateQuantityMock).toHaveBeenCalledWith(6);
  });

  it("decreases quantity when minus button is clicked", () => {
    render(<QuantitySelector />);
    const minusButton = screen.getAllByRole("button")[0];
    fireEvent.click(minusButton);
    expect(updateQuantityMock).toHaveBeenCalledWith(4);
  });

  it("prevents quantity from going below min", () => {
    mockUseCart.mockReturnValue({
      quantity: 1,
      updateQuantity: updateQuantityMock,
    });
    render(<QuantitySelector min={1} />);
    const minusButton = screen.getAllByRole("button")[0];
    fireEvent.click(minusButton);
    expect(updateQuantityMock).not.toHaveBeenCalled();
  });

  it("prevents quantity from going above max", () => {
    mockUseCart.mockReturnValue({
      quantity: 99,
      updateQuantity: updateQuantityMock,
    });
    render(<QuantitySelector max={99} />);
    const plusButton = screen.getAllByRole("button")[1];
    fireEvent.click(plusButton);
    expect(updateQuantityMock).not.toHaveBeenCalled();
  });

  it("updates quantity when input value changes", () => {
    render(<QuantitySelector />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "10" } });
    expect(updateQuantityMock).toHaveBeenCalledWith(10);
  });

  it("ignores invalid input (negative or too large)", () => {
    render(<QuantitySelector min={1} max={10} />);
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "-5" } });
    expect(updateQuantityMock).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "100" } });
    expect(updateQuantityMock).not.toHaveBeenCalled();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<QuantitySelector />);
    expect(asFragment()).toMatchSnapshot();
  });
});
