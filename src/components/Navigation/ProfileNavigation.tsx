"use client";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import styles from "@/styles/Profile.module.scss";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { CartContext, TCartContext } from "src/context/CartContext";
import { AuthContext, TAuthContext } from "src/context/AuthContext";
import { CouponContext, TCouponContext } from "src/context/CouponContext";

import { logout } from "src/services/Api";

export default function ProfileNavigation() {
  const router = useRouter();
  const { auth, setAuth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);
  const { setCoupon } = useContext<TCouponContext>(CouponContext);

  const handleLogoutUser = async () => {
    const res = await logout();
    if (res.data) {
      setAuth({});
      setCart(null);
      setCoupon(null);
      localStorage.removeItem("bbp_user");
      localStorage.removeItem("bbp_product");
      router.push("/");
    }
  };

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  return (
    <div className={styles.profile__content} style={{ margin: "1.5rem 0" }}>
      <Nav
        as="ul"
        style={{
          listStyle: "none",
          padding: "0",
          lineHeight: 2,
          textTransform: "uppercase",
          fontSize: "0.7rem",
          display: "block",
        }}
      >
        <Nav.Item as="li" style={{ display: "flex" }}>
          <Link href="/profile/orders">
            <span className="link">Orders</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li" style={{ display: "flex" }}>
          <Link href="/profile/downloads">
            <span className="link">Downloads</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li" style={{ display: "flex" }}>
          <Link href="#" onClick={handleLogoutUser}>
            <span className="link">Logout</span>
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
