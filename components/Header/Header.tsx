import { useContext, useEffect, useState } from "react";
import { Rotate as Hamburger } from "hamburger-react";
import { CartContext, TCartContext } from "@/context/CartContext";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { logoutUser } from "@/services/Api";

import CartIcon from "./CartIcon";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/2.svg";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useValidateToken } from "@/hooks/useValidateToken";

import styles from "@/styles/Header.module.scss";
import { CouponContext, TCouponContext } from "@/context/CouponContext";

export default function Header({
  handleToggleMenu,
  isOpen,
  showMenu,
  noCartEvent,
  handleToggleCart,
}) {
  const router = useRouter();
  const isTokenExpired = useValidateToken();

  const [cartCount, setCartCount] = useState(0);

  const { auth, setAuth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);
  const { setCouponValue } = useContext<TCouponContext>(CouponContext);

  useEffect(() => {
    const cartCount =
      null != cart && Object.keys(cart).length ? cart.totalProductsCount : 0;
    setCartCount(cartCount);
  }, [cart]);

  const handleLogout = async () => {
    logoutUser();
    setAuth(null);
    setCart(null);
    setCartCount(0);
    setCouponValue("");
    localStorage.removeItem("bbp_user");
    localStorage.removeItem("bbp_product");
    router.push("/");
  };

  useEffect(() => {
    if (isTokenExpired) {
      setAuth(null);
      setCart(null);
      setCouponValue("");
      router.push("/login");
    }
  }, [isTokenExpired]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <a onClick={(e) => handleToggleMenu(e)} style={{ width: "100%" }}>
          <Hamburger
            toggled={isOpen}
            size={18}
            color={showMenu ? "white" : "black"}
          />
        </a>
        <Link href="/" passHref>
          <Navbar.Brand href="#home" className={styles.header__logo}>
            <Image src={logo} height="65" alt="bonitabasicsproductions" />
          </Navbar.Brand>
        </Link>
        <Navbar id="basic-navbar-nav" style={{ width: "100%" }}>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link
              className={styles.header__nav_link}
              style={{ cursor: "initial" }}
            >
              Welcome
            </Nav.Link>
            {!auth?.userId ? (
              <a className="nav-link" style={{ paddingLeft: "0" }}>
                Guest
              </a>
            ) : null}
            {!auth?.userId ? (
              <Nav.Link>
                <Link href="/login">
                  <span style={{ color: "#5782bf" }}>Sign-In</span>
                </Link>
              </Nav.Link>
            ) : (
              <NavDropdown title={auth.userNiceName} id="basic-nav-dropdown">
                <Link href="/profile" passHref>
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                </Link>
                <NavDropdown.Item href="#" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <CartIcon
              cartCount={cartCount}
              noCartEvent={noCartEvent}
              handleToggleCart={handleToggleCart}
            />
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}
