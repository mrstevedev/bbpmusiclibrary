"use client";
import { Fragment, useContext, useEffect, useState } from "react";
import { Rotate as Hamburger } from "hamburger-react";
import { CartContext, TCartContext } from "@/context/CartContext";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { CouponContext, TCouponContext } from "@/context/CouponContext";

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

    const overlay = document.querySelector(`.overlayNav`);
    overlay?.classList.toggle("overlay_active");
  };

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      setShowCart((prev) => {
        localStorage.setItem("cart", String(!prev));
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

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width={80}
              height={80}
              viewBox="0 0 360 360"
            >
              <g enable-background="new">
                <g id="Layer-1" data-name="Layer 1">
                  <clipPath id="cp3">
                    <path
                      transform="matrix(1,0,0,-1,0,360)"
                      d="M 0 360 L 360 360 L 360 0 L 0 0 Z "
                    />
                  </clipPath>
                  <g clip-path="url(#cp3)">
                    <path
                      transform="matrix(1,0,0,-1,278.3009,278.872)"
                      d="M 0 0 L -130.475 0 C -166.934 0 -196.59 29.656 -196.59 66.115 L -196.59 197.743 L -66.151 197.743 C -29.68 197.743 0 168.076 0 131.604 Z M -66.151 202.3 L -201.145 202.3 L -201.145 66.115 C -201.145 27.144 -169.422 -4.556 -130.475 -4.556 L 4.544 -4.556 L 4.544 131.604 C 4.544 170.576 -27.168 202.3 -66.151 202.3 "
                    />
                    <path
                      transform="matrix(1,0,0,-1,236.7804,182.705)"
                      d="M 0 0 L 0 -.204 C -.145 -5.854 -6.299 -9.087 -10.073 -10.458 L -17.178 -13.042 L -17.971 -13.318 L -18.776 -13.631 L -27.035 -16.637 L -27.035 -4.495 L -10.482 1.527 L -9.448 1.911 C -8.126 2.356 -5.758 3.029 -3.738 3.029 L -3.51 3.029 C -2.729 3.006 -2.031 2.873 -1.442 2.585 C -.974 2.356 -.589 2.02 -.337 1.551 C -.096 1.143 0 .625 0 0 "
                    />
                    <path
                      transform="matrix(1,0,0,-1,239.8576,211.3984)"
                      d="M 0 0 C 0 -7.393 -8.967 -10.002 -11.6 -10.951 L -30.112 -17.694 L -30.112 -4.34 L -11.576 2.404 L -9.761 3.077 C -8.654 3.414 -7.2 3.822 -5.733 3.955 C -5.373 4.003 -5.036 4.027 -4.7 4.027 L -4.52 4.027 C -4.291 4.027 -4.051 4.027 -3.798 4.003 C -1.707 3.822 0 2.813 0 0 "
                    />
                    <path
                      transform="matrix(1,0,0,-1,173.9953,149.2509)"
                      d="M 0 0 L 0 -.216 C -.168 -5.854 -6.311 -9.088 -10.098 -10.47 L -17.189 -13.066 L -17.995 -13.343 L -18.801 -13.632 L -27.059 -16.637 L -27.059 -4.508 L -10.518 1.515 L -9.46 1.899 C -8.149 2.332 -5.781 3.029 -3.762 3.029 L -3.51 3.029 C -2.752 3.006 -2.043 2.861 -1.466 2.585 C -.985 2.332 -.601 2.02 -.349 1.539 C -.12 1.118 0 .613 0 0 "
                    />
                    <path
                      transform="matrix(1,0,0,-1,233.0304,239.0829)"
                      d="M 0 0 C -1.551 -.553 -3.138 -1.202 -4.785 -1.803 L -23.297 -8.534 L -43.155 -15.771 L -43.155 63.014 L -64.973 79.218 L -64.973 64.408 C -65.226 64.348 -65.526 64.252 -65.73 64.18 L -67.558 63.543 L -86.094 56.774 L -86.094 43.432 L -67.582 50.188 C -66.98 50.392 -66.055 50.692 -64.973 51.125 L -64.973 32.733 L -105.977 17.695 L -105.977 97.489 L -125.161 111.879 L -124.561 112.083 L -108.657 117.853 L -108.056 118.105 L -106.276 118.755 L -106.156 118.814 L -83.882 126.868 L -83.773 126.94 C -83.773 126.94 -83.773 126.965 -83.701 126.965 L -83.678 126.977 C -81.67 127.698 -79.783 128.227 -78.1 128.552 C -78.076 128.552 -78.052 128.575 -78.027 128.575 C -77.956 128.575 -77.848 128.6 -77.775 128.647 C -75.647 128.96 -73.111 129.152 -70.503 128.78 L -70.467 128.78 C -68.52 128.383 -65.201 127.373 -62.16 124.837 L -44.79 111.674 C -39.789 107.912 -39.513 101.204 -39.513 101.204 C -39.381 100.387 -39.333 99.533 -39.369 98.655 L -39.369 98.355 C -39.417 96.973 -39.874 91.19 -43.648 85.24 L -43.504 85.288 L -43.336 85.36 L -41.749 85.926 L -21.085 93.45 L -20.94 93.499 L -20.929 93.499 L -20.881 93.522 C -18.873 94.28 -16.986 94.761 -15.315 95.134 L -15.207 95.134 C -15.159 95.134 -15.038 95.157 -14.979 95.182 C -12.851 95.554 -10.314 95.734 -7.706 95.338 L -7.657 95.338 C -5.723 94.953 -2.429 93.907 .661 91.371 L 18.007 78.232 C 23.031 74.47 23.284 67.786 23.284 67.786 C 24.462 60.586 19.161 51.294 14.726 46.293 C 16.696 46.148 26.193 44.814 26.193 33.046 C 26.193 19.955 16.601 6.047 0 0 M 23.428 47.278 C 22.755 47.735 22.07 48.132 21.324 48.505 C 25.063 54.179 28.177 61.716 27.203 68.194 C 27.143 69 26.818 72.511 24.858 76.129 C 23.536 78.533 21.77 80.492 19.594 81.923 L 19.112 82.428 L 18.908 82.428 L .36 96.144 L .312 96.191 L .084 96.384 C -2.801 98.476 -6.348 99.558 -10.471 99.558 C -14.005 99.558 -17.947 98.775 -22.19 97.213 C -22.636 97.093 -22.996 96.961 -23.345 96.816 L -23.598 96.696 L -26.278 95.759 L -32.204 93.606 L -36.604 92.021 C -35.666 95.014 -35.089 98.403 -35.594 101.685 C -35.895 104.63 -36.7 107.286 -37.962 109.595 C -39.284 112.011 -41.052 113.97 -43.228 115.377 L -43.732 115.894 L -43.912 115.894 L -62.341 129.477 L -62.413 129.562 L -62.509 129.634 L -62.617 129.729 C -65.526 131.917 -69.097 132.999 -73.304 132.999 C -76.874 132.999 -80.841 132.218 -85.084 130.655 L -85.661 130.438 C -85.865 130.379 -86.094 130.282 -86.334 130.21 L -89.099 129.2 L -95.025 127.024 L -106.481 122.901 L -108.309 122.229 L -127.722 115.148 L -128.6 114.8 L -130.078 114.234 L -130.078 29.103 L -107.815 12.61 L -67.281 27.588 L -67.281 -4.267 L -45.247 -20.712 L -43.18 -19.954 L -41.797 -19.461 L -30.942 -15.507 L -18.753 -11.059 L -3.438 -5.505 L -2.309 -5.072 L -1.936 -4.928 L -.697 -4.483 L .961 -3.811 L 1.31 -3.689 C 2.488 -3.27 3.642 -2.801 4.76 -2.296 L 4.977 -2.211 L 4.892 -2.235 C 11.96 .938 17.982 5.626 22.454 11.505 C 27.419 17.995 30.136 25.641 30.136 33.046 C 30.136 40.92 26.493 45.139 23.428 47.278 "
                    />
                  </g>
                </g>
              </g>
            </svg> */}
          </Link>

          <Navbar className="pe-3">
            <Nav style={{ gap: "6px", fontSize: "0.9rem" }}>
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
