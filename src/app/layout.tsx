import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.scss";

import NextTopLoader from "nextjs-toploader";

import Footer from "@/components/Footer/Footer";
import LoadingOverlay from "@/components/Loading/LoadingOverlay";
import HeaderWrapper from "@/components/Header/HeaderWrapper";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@/lib/apollo-wrapper";
import { CouponProvider } from "@/context/CouponContext";
import { ElementsProvider } from "src/providers/ElementsProvider";
import CouponNotification from "@/components/Notifications/CouponNotification";
import CookieNotification from "@/components/Notifications/CookieNotification";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ElementsProvider>
          <ApolloProvider>
            <CartProvider>
              <AuthProvider>
                <CouponProvider>
                  <NextTopLoader
                    color="cadetblue"
                    crawlSpeed={1000}
                    speed={1000}
                    height={2}
                  />
                  <CouponNotification />
                  <HeaderWrapper />
                  {children}
                  <CookieNotification />
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
                  <Footer />
                </CouponProvider>
              </AuthProvider>
            </CartProvider>
          </ApolloProvider>
        </ElementsProvider>
      </body>
    </html>
  );
}
