import CartItem from "@/components/Checkout/Cart/CartItem";
import CartTotal from "@/components/Checkout/Cart/CartTotal";
import { screen, render } from "@testing-library/react";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Test checkout page", () => {
  it("Should contain at least 1 or more cart items", () => {
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
        products={[]}
        productsCount={1}
        couponPrice={3}
        couponCode="summersale3"
        setCart={() => {}}
      />
    );

    const cartItems = screen.getAllByTestId("product-item");
    expect(cartItems.length).toBeGreaterThanOrEqual(1);
  });

  it("Should contain a product name in cart item", () => {
    const name = "Ambition";
    render(
      <CartItem
        key={1}
        product={{
          databaseId: 399,
          image:
            "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
          name: name,
          price: 29.99,
          qty: 1,
          slug: "ambition",
        }}
        couponApplied={false}
        products={[]}
        productsCount={1}
        couponPrice={3}
        couponCode="summersale3"
        setCart={() => {}}
      />
    );
    const productName = screen.getByTestId("product-name");
    expect(productName).toContainHTML(name);
  });

  it("Should contain a product price in cart item", () => {
    const price = 29.99;
    render(
      <CartItem
        key={1}
        product={{
          databaseId: 399,
          image:
            "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
          name: "Ambition",
          price: price,
          qty: 1,
          slug: "ambition",
        }}
        couponApplied={false}
        products={[]}
        productsCount={1}
        couponPrice={3}
        couponCode="summersale3"
        setCart={() => {}}
      />
    );
    const productPrice = screen.getByTestId("product-price");
    expect(productPrice).toBeInTheDocument();
  });

  it("Should initially not have a coupon attached to item", () => {
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
        products={[]}
        productsCount={1}
        couponPrice={3}
        couponCode="summersale3"
        setCart={() => {}}
      />
    );
    const productCoupon = screen.queryByTestId("product-coupon");
    expect(productCoupon).not.toBeInTheDocument();
  });

  it("Should have a coupon attached to item when a coupon is added", () => {
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
        couponApplied={true}
        products={[]}
        productsCount={1}
        couponPrice={3}
        couponCode="summersale3"
        setCart={() => {}}
      />
    );
    const productCoupon = screen.queryByTestId("product-coupon");
    expect(productCoupon).toBeInTheDocument();
  });

  it("Should have a subtotal price", () => {
    render(
      <CartTotal key={1} couponApplied={false} totalProductsPrice={29.99} />
    );
    const subtotalPrice = screen.getByTestId("product-subtotal");
    expect(subtotalPrice).toBeInTheDocument();
  });

  it("Should have a total price", () => {
    render(
      <CartTotal key={1} couponApplied={false} totalProductsPrice={29.99} />
    );
    const totalPrice = screen.getByTestId("product-total");
    expect(totalPrice).toBeInTheDocument();
  });
});
