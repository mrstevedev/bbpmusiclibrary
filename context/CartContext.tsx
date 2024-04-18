import { useState, useEffect, createContext } from "react";

export type Product = {
  databaseId: number;
  image: string;
  totalPrice: number;
  name: string;
  price: number;
  qty: number;
  slug: string;
  totalProductsPrice: number;
};

export type Cart = {
  coupon?: { applied: boolean; code: string; amount: number } | undefined;
  products: Product[];
  totalProductsCount: number;
  totalProductsPrice: number;
};

export type TCartContext = {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<any>>;
};

export const CartContext = createContext<TCartContext>({} as any);

type CartProps = {
  children: object;
};

export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<Cart>({
    coupon: { applied: false, code: "", amount: 0 },
    products: [],
    totalProductsCount: 0,
    totalProductsPrice: 0,
  });

  useEffect(() => {
    if (process.browser) {
      let cartData = JSON.parse(localStorage.getItem("bbp_product") as string);
      setCart(cartData);
    }
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
