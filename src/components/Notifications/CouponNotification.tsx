"use client";
import { Alert } from "react-bootstrap";
import { Fragment, useContext } from "react";
import styles from "@/styles/CouponNotification.module.scss";
import { CouponContext, TCouponContext } from "@/context/CouponContext";

export default function CouponNotification() {
  const { coupon } = useContext<TCouponContext>(CouponContext);
  const description = coupon?.description;

  return (
    <Fragment>
      {coupon ? (
        <Alert className={`alert-fade ${styles.BBP_Coupon__Notification}`}>
          {description}
        </Alert>
      ) : null}
    </Fragment>
  );
}
