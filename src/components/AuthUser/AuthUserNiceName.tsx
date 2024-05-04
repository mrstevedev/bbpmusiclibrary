"use client";
import { useContext } from "react";
import { AuthContext, TAuthContext } from "../../context/AuthContext";

import styles from "@/styles/Profile.module.scss";

export default function AuthUserNiceName() {
  const { auth } = useContext<TAuthContext>(AuthContext);

  return (
    <span className={styles.profile__text} style={{ color: "#ccc" }}>
      {auth?.userNiceName}
    </span>
  );
}
