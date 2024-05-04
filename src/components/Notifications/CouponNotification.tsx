"use client";
import { Alert } from "react-bootstrap";
import styles from "@/styles/AlertNotification.module.scss";
import { Fragment, useContext } from "react";
import { CouponContext, TCouponContext } from "src/context/CouponContext";

export default function CouponNotification() {
  const { coupon } = useContext<TCouponContext>(CouponContext);
  const description = coupon?.description;

  return (
    <Fragment>
      {coupon ? (
        <Alert className={styles.AlertNotification}>{description}</Alert>
      ) : null}
    </Fragment>
  );
}
