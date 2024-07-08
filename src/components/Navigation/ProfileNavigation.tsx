"use client";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import styles from "@/styles/Profile.module.scss";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { CartContext, TCartContext } from "@/context/CartContext";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { CouponContext, TCouponContext } from "@/context/CouponContext";

import { logout } from "@/services/Api";
import { USER, PRODUCT } from "@/constants/index";

export default function ProfileNavigation() {
  const router = useRouter();
  const { setAuth } = useContext<TAuthContext>(AuthContext);
  const { setCart } = useContext<TCartContext>(CartContext);
  const { setCoupon } = useContext<TCouponContext>(CouponContext);

  const handleLogoutUser = async () => {
    const res = await logout();
    if (res.data) {
      setAuth({});
      setCart(null);
      setCoupon(null);
      localStorage.removeItem(USER.BBP_USER);
      localStorage.removeItem(PRODUCT.BBP_PRODUCT);
      router.push("/");
    }
  };

  return (
    <div className={styles.BBP_Profile__Container}>
      <Nav as="ul" className={styles.BBP_Profile__Nav}>
        <Nav.Item as="li" className={styles.BBP_Profile_Nav__Item}>
          <Link href="/account/orders">
            <span className="link">Orders</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link href="/account/downloads">
            <span className="link">Downloads</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link href="/account/newsletter/subscribe">
            <span className="link">Subscribe</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link href="/account/newsletter/unsubscribe">
            <span className="link">UnSubscribe</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link href="#" onClick={handleLogoutUser}>
            <span className="link">Log out</span>
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
