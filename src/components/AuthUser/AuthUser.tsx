import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext, TCartContext } from "../../context/CartContext";
import { AuthContext, TAuthContext } from "../../context/AuthContext";
import { CouponContext, TCouponContext } from "src/context/CouponContext";

import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "src/services/Api";

export default function AuthUser({ user }) {
  const router = useRouter();

  const [_, setCartCount] = useState(0);

  const { auth, setAuth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);
  const { setCoupon } = useContext<TCouponContext>(CouponContext);

  useEffect(() => {
    const count =
      null != cart && Object.keys(cart).length ? cart.totalProductsCount : 0;
    setCartCount(count);
  }, [cart]);

  const handleLogout = async () => {
    const res = await logout();
    if (res.data) {
      setAuth(null);
      setCart(null);
      setCartCount(0);
      setCoupon(null);
      localStorage.removeItem("bbp_user");
      localStorage.removeItem("bbp_product");
      router.push("/");
    }
  };
  return (
    <Fragment>
      <NavDropdown title={auth.userNiceName} id="basic-nav-dropdown">
        <Link href="/profile" passHref>
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
        </Link>
        <NavDropdown.Item href="#" onClick={handleLogout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Fragment>
  );
}
