import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders with default text and is not disabled", () => {
    render(<Button />);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();
  });

  it("renders with custom text prop and calls onClick when clicked", () => {
    const mockOnClick = vi.fn(); // Vitest mock function
    render(<Button text="Submit" onClick={mockOnClick} />);
    const buttonElement = screen.getByText("Submit");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled prop is true", () => {
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick} disabled />);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
