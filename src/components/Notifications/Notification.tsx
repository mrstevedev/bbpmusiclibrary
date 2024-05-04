"use client";
import Link from "next/link";
import styles from "@/styles/Notification.module.scss";
import { useState } from "react";

export default function CookieNotification() {
  const [cookieNotification, setCookieNotification] = useState(false);

  const handleAcceptCookie = () => {
    setCookieNotification(false);
    document.cookie = "bb_notification_accept=true;";
  };
  return (
    <>
      <div className={styles.Cookie_Notification}>
        <p className={styles.Cookie_Notification_Text}>
          This site uses cookies to provide a great user experience. By using
          Bonita Basics Productions, you agree to our use of cookies.
        </p>
        <Link href="#" className={styles.Cookie_Notification_Btn}>
          Cancel
        </Link>

        <Link
          href="#"
          className={styles.Cookie_Notification_Btn}
          onClick={handleAcceptCookie}
        >
          Accept
        </Link>
      </div>
    </>
  );
}
