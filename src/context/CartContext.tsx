"use client";
import { useState, useEffect, createContext } from "react";
import { PRODUCT } from "@/constants/index";

export type Product = {
  id: string;
  databaseId: number;
  image: string;
  totalPrice: number;
  name: string;
  price: number;
  qty: number;
  slug: string;
  description: string;
  salePrice: string;
  regularPrice: string;
  totalProductsPrice: number;
};

export type Cart = {
  coupon?: { isApplied: boolean; code: string; amount: number } | undefined;
  products: Product[];
  totalProductsCount: number;
  totalProductsPrice: number;
};

export type TCartContext = {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<any>>;
};

export const CartContext = createContext<TCartContext>({} as any);

type CartProps = React.PropsWithChildren;

export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<Cart>({
    coupon: { isApplied: false, code: "", amount: 0 },
    products: [],
    totalProductsCount: 0,
    totalProductsPrice: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartData =
        JSON.parse(localStorage.getItem(PRODUCT.BBP_PRODUCT) as string) || "";
      setCart(cartData);
    }
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
