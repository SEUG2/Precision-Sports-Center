import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Shop from "../Shop";
import { CartProvider } from "@/context/CartContext";

// Basic smoke test to ensure the new shop page mounts without crashing.
describe("Shop page", () => {
  it("renders the hero headline", () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Shop />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/elite jerseys, boots & equipment/i)).toBeInTheDocument();
  });
});
