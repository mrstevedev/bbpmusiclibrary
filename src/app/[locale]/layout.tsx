import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.scss";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

import Footer from "@/components/Footer/Footer";
// import LoadingOverlay from "@/components/Loading/LoadingOverlay";
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

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WFPS81PHC2"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WFPS81PHC2');`}
        </Script>
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ElementsProvider>
            <ApolloProvider>
              <CouponProvider>
                <AuthProvider>
                  <CartProvider>
                    <NextTopLoader
                      color="cadetblue"
                      height={2}
                      showSpinner={false}
                    />
                    <CouponNotification />
                    <HeaderWrapper />
                    {children}
                    <CookieNotification />
                    {/* <LoadingOverlay /> */}
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
                  </CartProvider>
                </AuthProvider>
              </CouponProvider>
            </ApolloProvider>
          </ElementsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
