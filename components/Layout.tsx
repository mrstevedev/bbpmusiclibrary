import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { CouponProvider } from "@/context/CouponContext";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SidebarCart from "@/components/sidebar/SidebarCart";
import OverlayNav from "@/components/Navigation/OverlayNav";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Newsletter from "@/components/Notifications/Newsletter";
import LoadingOverlay from "@/components/Loading/LoadingOverlay";
import Notification from "@/components/Notifications/Notification";
import AlertNotification from "@/components/Alert/AlertNotification";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cookieNotification, setCookieNotification] = useState(false);

  const { coupon, slug } = children.props;

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      setShowCart(true);
    }
    setTimeout(() => {
      if (document.cookie.indexOf("bb_notification_accept") == -1) {
        setCookieNotification(true);
      }
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (
        scrollPosition <= 0 &&
        document.cookie.indexOf("bb_subscription_accept") == -1
      ) {
        setShowModal(true);
        document.body.classList.add("modal__open");
      }
    }, 6000);
  }, [router.route]);

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
    overlay?.classList.toggle("active");
  };

  const handleAcceptCookie = () => {
    setCookieNotification(false);
    document.cookie = "bb_notification_accept=true;";
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    document.body.classList.remove("modal__open");
    document.cookie = "bb_subscription_accept=true;";
  };

  return (
    <Fragment>
      <CartProvider>
        <AuthProvider>
          <CouponProvider>
            {router.pathname !== "/checkout" ? (
              <Fragment>
                {coupon ? (
                  coupon.length > 0 ? (
                    <AlertNotification data={coupon} />
                  ) : null
                ) : null}
                <Header
                  showMenu={showMenu}
                  handleToggleMenu={handleToggleMenu}
                  handleToggleCart={handleToggleCart}
                  isOpen={isOpen}
                />
                <Container fluid={router.pathname === "/" ? true : false}>
                  <Breadcrumb
                    slug={slug}
                    homeElement={"Home"}
                    activeClasses="breadcrumb-active"
                    containerClasses="flex"
                    capitalizeLinks
                  />
                </Container>
              </Fragment>
            ) : null}
            {children}
            {cookieNotification ? (
              <Notification handleAcceptCookie={handleAcceptCookie} />
            ) : null}
            <SidebarCart
              show={showCart}
              handleClose={handleCloseCart}
              placement="end"
            />
            <OverlayNav handleToggleMenu={handleToggleMenu} />
            {showModal ? (
              <Newsletter handleCloseModal={handleCloseModal} />
            ) : null}
            <LoadingOverlay />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </CouponProvider>
        </AuthProvider>
      </CartProvider>
      <Footer />
    </Fragment>
  );
};

export default Layout;
