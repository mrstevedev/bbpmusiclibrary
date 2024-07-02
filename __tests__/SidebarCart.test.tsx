import CartIcon from "@/components/Header/CartIcon";
import Cart from "@/components/SidebarCart/Cart";
import CartItem from "@/components/SidebarCart/CartItem";
import SidebarCart from "@/components/SidebarCart/SidebarCart";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Test the sidebar cart", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it("Should be closed", () => {
    render(
      <SidebarCart
        key={1}
        show={false}
        placement="end"
        handleClose={() => {}}
      />
    );

    const sidebar = screen.queryByTestId("sidebar-cart");
    expect(sidebar).not.toBeInTheDocument();
  });

  it("Should click button to open", async () => {
    render(<CartIcon cartCount={1} key={1} handleToggleCart={() => {}} />);
    render(
      <SidebarCart key={1} show={true} placement="end" handleClose={() => {}} />
    );
    const cartButton = screen.getByTestId("cart-button");
    const sidebarCart = screen.queryByTestId("sidebar-cart");
    fireEvent.click(cartButton);
    expect(sidebarCart).toBeInTheDocument();
  });

  it("Should have text content of 1 or more items in the cart", () => {
    render(
      <Cart
        key={1}
        setCart={() => {}}
        products={[
          {
            databaseId: 399,
            image:
              "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
            name: "Ambition",
            price: 29.99,
            qty: 1,
            slug: "ambition",
          },
        ]}
        couponApplied={false}
        handleCloseCart={() => {}}
        totalProductsPrice={29.99}
        couponAmount={0}
        couponCode={null}
      />
    );

    const cartCount = screen.getByTestId("cart-count");
    expect(cartCount).toHaveTextContent(
      /You have [1-9] ([a-zA-Z]+?)(s\b|\b) in your cart/
    );
  });

  it("Should have 1 or more items in the cart in the document", () => {
    render(
      <CartItem
        key={1}
        product={{
          databaseId: 399,
          image:
            "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
          name: "Ambition",
          price: 29.99,
          qty: 1,
          slug: "ambition",
        }}
        couponApplied={false}
        handleRemoveItem={() => {}}
        couponAmount={0}
        couponCode={""}
      />
    );

    const cartItem = screen.getByTestId("cart-item");
    expect(cartItem).toBeInTheDocument();
  });

  it("Should contain a subtotal price", () => {
    render(
      <Cart
        key={1}
        setCart={() => {}}
        products={[
          {
            databaseId: 399,
            image:
              "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
            name: "Ambition",
            price: 29.99,
            qty: 1,
            slug: "ambition",
          },
        ]}
        couponApplied={false}
        handleCloseCart={() => {}}
        totalProductsPrice={29.99}
        couponAmount={0}
        couponCode={null}
      />
    );
    const subTotal = screen.getByTestId("cart-subtotal");
    expect(subTotal).toHaveTextContent(/\d{1,3}[,\\.]?(\\d{1,2})?/i);
  });
});
