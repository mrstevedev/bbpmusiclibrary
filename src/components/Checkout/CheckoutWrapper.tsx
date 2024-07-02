"use client";
import Link from "next/link";
import Image from "next/image";
import React, { Suspense, useContext } from "react";

import logo from "@/public/images/logo.svg";
import styles from "@/styles/Checkout.module.scss";

import { CartContext, TCartContext } from "@/context/CartContext";

import Cart from "@/components/Checkout/Cart/Cart";
import PaymentSteps from "@/components/Checkout/PaymentSteps";
import ExpressCheckout from "@/components/Checkout/ExpressCheckout";
import CheckoutForm from "@/components/Forms/Checkout/CheckoutForm";
import MobileCart from "@/components/Checkout/MobileCart/MobileCart";

import { Container } from "react-bootstrap";
import { CURRENCY_CODE } from "@/constants/index";
import { calculatePriceWithTax } from "@/util/index";

export default function CheckoutWrapper() {
  const { cart } = useContext<TCartContext>(CartContext);

  const products = cart && Object.keys(cart).length ? cart.products : [];

  const price =
    null != cart && Object.keys(cart).length ? cart.totalProductsPrice : 0;

  const productsCount =
    null != cart && Object.keys(cart).length ? cart.totalProductsCount : 0;

  const productName =
    null != cart && Object.keys(cart).length ? cart.products[0]?.name : "";

  const databaseId =
    null != cart && Object.keys(cart).length ? cart.products[0]?.databaseId : 0;

  let totalProductsPrice =
    null != cart && Object.keys(cart).length ? cart.totalProductsPrice : 0;

  let couponApplied =
    null != cart && Object.keys(cart).length ? cart.coupon?.isApplied : false;

  const purchaseUnits = cart?.products?.map((product) => ({
    reference_id: product.databaseId,
    description: product.name,
    amount: {
      currency_code: CURRENCY_CODE,
      value: calculatePriceWithTax(product.price),
    },
  }));
  console.log("purchaseUnits:", purchaseUnits);

  return (
    <Container>
      <div className={styles.BBP_Checkout__Left}>
        <div className="d-flex justify-content-center">
          <div className="row">
            <Link href="/" className={styles.BBP_Checkout__Logo}>
              <Image
                src={logo}
                height="70"
                alt="Bonita Basics Productions Logo"
              />
            </Link>
          </div>
        </div>
        <MobileCart price={price} />
        <PaymentSteps />

        <ExpressCheckout
          price={price}
          databaseId={databaseId}
          productName={productName}
          purchaseUnits={purchaseUnits}
        />

        <div className="alternative-payment-separator">
          <span className="alternative-payment-separator__content">OR</span>
        </div>
        <Suspense>
          <CheckoutForm purchaseUnits={purchaseUnits} />
        </Suspense>

        <hr />
        <p style={{ fontWeight: 100, fontSize: "0.8rem" }}>
          All rights reserved BBP Music Library
        </p>
      </div>

      <Cart
        products={products}
        productsCount={productsCount}
        couponApplied={couponApplied}
        totalProductsPrice={totalProductsPrice}
      />
    </Container>
  );
}
