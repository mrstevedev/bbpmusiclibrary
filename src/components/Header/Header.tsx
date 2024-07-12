"use client";
import { Fragment, useContext, useEffect, useState } from "react";
import { Rotate as Hamburger } from "hamburger-react";
import { CartContext, TCartContext } from "@/context/CartContext";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { CouponContext, TCouponContext } from "@/context/CouponContext";
import { CART, ROUTE } from "@/constants/index";
import CartIcon from "./CartIcon";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useValidateToken } from "@/hooks/useValidateToken";

import styles from "@/styles/Header.module.scss";
import OverlayNav from "@/components/Navigation/OverlayNav";
import SidebarCart from "@/components/SidebarCart/SidebarCart";
import AuthenticatedUser from "@/components/AuthUser/AuthUser";
import NonAuthenticatedUser from "@/components/AuthUser/NonAuthenticatedUser";

export default function Header() {
  const router = useRouter();
  const isTokenExpired = useValidateToken();

  const [cartCount, setCartCount] = useState(0);

  const { auth, setAuth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);
  const { setCoupon } = useContext<TCouponContext>(CouponContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const cartCount =
      null != cart && Object.keys(cart).length ? cart.totalProductsCount : 0;
    setCartCount(cartCount);
  }, [cart]);

  useEffect(() => {
    if (isTokenExpired) {
      setAuth(null);
      setCart(null);
      setCoupon(null);
      router.push(ROUTE.LOGIN);
    }
  }, [isTokenExpired, router, setAuth, setCart, setCoupon]);

  const handleToggleCart = () => {
    setShowCart((prev) => {
      localStorage.setItem(CART.CART_USER_CART, String(!prev));
      return !prev;
    });
  };

  const handleCloseCart = () => {
    setShowCart((prev) => !prev);
    localStorage.removeItem(CART.CART_USER_CART);
  };

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);

    const overlay = document.querySelector(`.overlayNav`);
    overlay?.classList.toggle("overlay_active");
  };

  useEffect(() => {
    if (localStorage.getItem(CART.CART_USER_CART) !== null) {
      setShowCart((prev) => {
        localStorage.setItem(CART.CART_USER_CART, String(!prev));
        return !prev;
      });
    }
  }, []);

  return (
    <Fragment>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ position: "relative" }}
      >
        <Container fluid>
          <div>
            <div onClick={(e) => handleToggleMenu()}>
              <Hamburger
                toggled={isOpen}
                size={18}
                color={isOpen ? "white" : "black"}
              />
            </div>
          </div>

          <Link href="/" className={styles.BBP_Header__Logo}>
            <Image
              src={
                "https://d1hx41nm7bdfp5.cloudfront.net/wp-content/uploads/2024/06/19132039/logo.png"
              }
              width={65}
              height={65}
              alt="BBP Music Library"
            />
          </Link>

          <Navbar className="pe-3">
            <Nav style={{ gap: "6px" }}>
              <Nav.Link className={styles.BBP_Header_Welcome__Link}>
                Welcome
              </Nav.Link>
              {auth?.userId ? (
                <AuthenticatedUser user={auth} setUser={setAuth} />
              ) : (
                <NonAuthenticatedUser />
              )}
              <CartIcon
                cartCount={cartCount}
                handleToggleCart={handleToggleCart}
              />
            </Nav>
          </Navbar>
        </Container>
      </Navbar>
      <SidebarCart
        show={showCart}
        handleClose={handleCloseCart}
        placement="end"
      />
      <OverlayNav handleToggleMenu={handleToggleMenu} />
    </Fragment>
  );
}
