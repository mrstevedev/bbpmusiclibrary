"use client";
import { Alert } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { Fragment, useContext } from "react";
import styles from "@/styles/CouponNotification.module.scss";
import { CouponContext, TCouponContext } from "@/context/CouponContext";
import { TRANSLATE } from "@/constants/index";

export default function CouponNotification() {
  const { coupon } = useContext<TCouponContext>(CouponContext);
  const description = coupon?.description;
  const t = useTranslations(TRANSLATE.TRNASLATE_COUPON_NOTIFICATION);

  return (
    <Fragment>
      {coupon ? (
        <Alert className={`${styles.BBP_Coupon__Notification}`}>
          {t("description")}
        </Alert>
      ) : null}
    </Fragment>
  );
}
