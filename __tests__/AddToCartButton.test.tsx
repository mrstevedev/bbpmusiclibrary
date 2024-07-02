import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import AddToCartButton from "@/components/Buttons/AddToCartButton";

describe("Add to cart button", () => {
  it("Should have text Add to cart", async () => {
    await render(
      <AddToCartButton
        key={1}
        isItemInCart={false}
        handleAddToCart={() => {}}
        product={{ downloadable: true }}
      />
    );
    const button = await screen.findByRole("button", { name: "Add to cart" });
    await waitFor(() => expect(button).toHaveTextContent("Add to cart"));
  });

  it("Should have text View in checkout", async () => {
    await render(
      <AddToCartButton
        key={1}
        isItemInCart={true}
        handleAddToCart={() => {}}
        product={{ downloadable: true }}
      />
    );

    const button = await screen.findByRole("button", {
      name: "View in checkout",
    });

    await waitFor(() => expect(button).toHaveTextContent("View in checkout"));
  });
});
