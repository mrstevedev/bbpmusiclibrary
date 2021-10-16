import Head from "next/head";
import Header from "./Header";
import SidebarCart from "./SidebarCart";
import { AppProvider } from "./context/AppContext";
import { useEffect, useState } from "react";
import OverlayNav from "./OverlayNav";
import Modal from './Modal';
import CookieNotification from './CookieNotification';
import NotificationsBar from './NotificationsBar';
import Script from 'next/script'
import Footer from '../components/Footer'

const Layout = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [cookieNotification, setCookieNotification] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Get value of localStorage of item key set when cart opened/closed
    if (localStorage.getItem("cartOpen") !== null) {
      setShowCart(true);
    }

    setTimeout(() => {
      if(document.cookie.indexOf('bb_notification_accept') == -1 ) {
        setCookieNotification(true)
      }
      const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
      if(scrollPosition <= 0) {
        setShowModal(true)
        document.body.classList.add("modal__open");
      }
    }, 6000)

  }, []);

  const handleShowCart = (e) => {
    e.preventDefault();

    setShowCart(true);

    const cartEl = document.querySelector(".cart");
    cartEl.classList.add("active");

    // Set localStorage with value when cart opened
    localStorage.setItem("cartOpen", true);
  };

  const handleCloseCart = (e) => {
    setShowCart(false);
    localStorage.removeItem("cartOpen");
  };

  const handleToggleMenu = (e) => {

    showMenu === true ? setShowMenu(false) : setShowMenu(true);

    const overlay = document.querySelector('.OverlayNav_Overlay__Nav__2C0zN');
    overlay.classList.toggle('active')

    if(isOpen === false) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  };

  const handleAcceptCookie = (e) => {
    setCookieNotification(false)
    document.cookie="bb_notification_accept=true;";
  }

  const handleCloseModal = () => {
    setShowModal(false)
    document.body.classList.remove("modal__open");
  }

  return (
    <>
     { showMenu ? (
       <Script
       dangerouslySetInnerHTML={{
         __html: `document.body.classList.add('mobile__menu-open')`
     }} />
     ) : (
      <Script
      dangerouslySetInnerHTML={{
        __html: `document.body.classList.remove('mobile__menu-open')`
    }} />
     ) }

     { showCart ? (
        <Script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.add('sidebarCart-open')`
      }} />
      ) : (
       <Script
       dangerouslySetInnerHTML={{
         __html: `document.body.classList.remove('sidebarCart-open')`
     }} />
     ) }
    <AppProvider>
      <Head>
        <title>test</title>
      </Head>
      <NotificationsBar />
      <Header
        showMenu={showMenu}
        handleToggleMenu={handleToggleMenu}
        handleShowCart={handleShowCart}
        isOpen={isOpen}
      />
      {children}
      
      { cookieNotification === true ? (
        <CookieNotification handleAcceptCookie={handleAcceptCookie} />
      ) : '' }
      
      <SidebarCart showCart={showCart} handleCloseCart={handleCloseCart} />
      <OverlayNav showMenu={showMenu} handleToggleMenu={handleToggleMenu} />

        { showModal === true ? (
          <Modal showModal={showModal} handleCloseModal={handleCloseModal} />
        ) : '' }

    </AppProvider>
    <Footer />
    </>
  );
};

export default Layout;
