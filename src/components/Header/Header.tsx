"use client";
import { Fragment, useContext, useEffect, useState } from "react";
import { Rotate as Hamburger } from "hamburger-react";
import { CartContext, TCartContext } from "@/context/CartContext";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { CouponContext, TCouponContext } from "@/context/CouponContext";
import { CART, IMAGE, ROUTE } from "@/constants/index";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useValidateToken } from "@/hooks/useValidateToken";

import styles from "@/styles/Header.module.scss";
import CartIcon from "@/components/Header/CartIcon";
import OverlayNav from "@/components/Navigation/OverlayNav";
import SidebarCart from "@/components/SidebarCart/SidebarCart";
import AuthenticatedUser from "@/components/AuthUser/AuthUser";
import NonAuthenticatedUser from "@/components/AuthUser/NonAuthenticatedUser";
import LanguageToggleButton from "@/components/LangToggle/LocaleSwitcher";
import LoadingOverlay from "@/components/Loading/LoadingOverlay";

import { useLocale } from "next-intl";

export default function Header() {
  const router = useRouter();
  const locale = useLocale();
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
          <div onClick={(e) => handleToggleMenu()}>
            <Hamburger
              toggled={isOpen}
              size={18}
              color={isOpen ? "white" : "black"}
              label="menu button"
            />
          </div>

          <Link href={`/${locale}`} className={styles.BBP_Header__Logo}>
            <Image
              src={IMAGE.IMAGE_LOGO}
              width={65}
              height={65}
              alt="BBP Music Library"
            />
          </Link>

          <Navbar className="navbar-right">
            <Nav
              className={`${auth ? "gap-1" : "gap-3"} items-center`}
              style={{ alignItems: "center" }}
            >
              <LanguageToggleButton />

              {auth?.userId && (
                <AuthenticatedUser user={auth} setUser={setAuth} />
              )}

              {!auth?.userId && <NonAuthenticatedUser />}

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
        locale={locale}
      />
      <OverlayNav locale={locale} handleToggleMenu={handleToggleMenu} />
      {/* Try to put this under a COOKIE */}
      <LoadingOverlay />
    </Fragment>
  );
}
