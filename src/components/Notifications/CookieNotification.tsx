"use client";
import Link from "next/link";
import styles from "@/styles/Notification.module.scss";
import { Fragment, useEffect, useState } from "react";

export default function CookieNotification() {
  const [cookieAccepted, setCookieAccepted] = useState(false);

  const handleAcceptCookie = () => {
    setCookieAccepted(false);
    document.cookie = "bbp_accept_cookies=true;";
  };

  useEffect(() => {
    if (document.cookie.indexOf("bbp_accept_cookies") === -1) {
      setCookieAccepted(true);
    }
  }, []);

  return (
    <Fragment>
      {cookieAccepted ? (
        <div className={styles.BBP_Cookie__Notification}>
          <p className={styles.BBP_Cookie_Notification__Text}>
            This site uses cookies to provide a great user experience. By using
            BBPMusicLibrary, you agree to our use of cookies.
          </p>
          <Link href="#" className={styles.BBP_Cookie_Notification__Button}>
            Cancel
          </Link>

          <Link
            href="#"
            className={styles.BBP_Cookie_Notification__Button}
            onClick={handleAcceptCookie}
          >
            Accept
          </Link>
        </div>
      ) : null}
    </Fragment>
  );
}
