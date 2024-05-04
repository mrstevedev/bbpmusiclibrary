"use client";
import { Fragment, useContext, useEffect, useState } from "react";
import { Rotate as Hamburger } from "hamburger-react";
import { CartContext, TCartContext } from "../../context/CartContext";
import { AuthContext, TAuthContext } from "../../context/AuthContext";
import { CouponContext, TCouponContext } from "src/context/CouponContext";

import CartIcon from "./CartIcon";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import { useRouter } from "next/navigation";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useValidateToken } from "src/hooks/useValidateToken";

import styles from "@/styles/Header.module.scss";
import OverlayNav from "src/components/Navigation/OverlayNav";
import SidebarCart from "src/components/SidebarCart/SidebarCart";
import AuthenticatedUser from "src/components/AuthUser/AuthUser";
import NonAuthenticatedUser from "src/components/AuthUser/NonAuthenticatedUser";

export default function Header() {
  const router = useRouter();
  const isTokenExpired = useValidateToken();

  const [cartCount, setCartCount] = useState(0);

  const { auth, setAuth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);
  const { setCoupon } = useContext<TCouponContext>(CouponContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
      router.push("/login");
    }
  }, [isTokenExpired, router, setAuth, setCart, setCoupon]);

  const handleToggleCart = () => {
    setShowCart((prev) => {
      localStorage.setItem("cart", String(!prev));
      return !prev;
    });
  };

  const handleCloseCart = () => {
    setShowCart((prev) => !prev);
    localStorage.removeItem("cart");
  };

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
    setShowMenu((prev) => !prev);

    const overlay = document.querySelector(`.overlayNav`);
    overlay?.classList.toggle("overlay_active");
  };

  return (
    <Fragment>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <a onClick={(e) => handleToggleMenu()} style={{ width: "100%" }}>
            <Hamburger
              toggled={isOpen}
              size={18}
              color={showMenu ? "white" : "black"}
            />
          </a>
          <Navbar.Brand className={styles.header__logo}>
            <Link href="/">
              <Image src={logo} height="65" alt="bonitabasicsproductions" />
            </Link>
          </Navbar.Brand>

          <Navbar id="basic-navbar-nav" style={{ width: "100%" }}>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                className={styles.header__nav_link}
                style={{ cursor: "initial" }}
              >
                Welcome
              </Nav.Link>
              {auth?.userId ? (
                <AuthenticatedUser user={auth} />
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
