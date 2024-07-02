"use client";
import { useContext } from "react";
import styles from "@/styles/Profile.module.scss";
import { AuthContext, TAuthContext } from "@/context/AuthContext";

export default function AuthUserNiceName() {
  const { auth } = useContext<TAuthContext>(AuthContext);

  return <span className={styles.BBP_Profile__Name}>{auth?.userNiceName}</span>;
}
