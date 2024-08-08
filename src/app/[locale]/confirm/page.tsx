"use client";
import Link from "next/link";
import { Fragment, Suspense, useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "react-bootstrap";
import styles from "@/styles/Confirm.module.scss";

import { CartContext, TCartContext } from "@/context/CartContext";
import { CouponContext, TCouponContext } from "@/context/CouponContext";
import { PRODUCT } from "@/constants/index";

export default function Confirm() {
  const ConfirmWrapper = () => {
    const params = useSearchParams();
    const email = params?.get("email");
    const success = params?.get("success");

    const { setCart } = useContext<TCartContext>(CartContext);
    const { setCoupon } = useContext<TCouponContext>(CouponContext);

    useEffect(() => {
      if (success) {
        localStorage.removeItem(PRODUCT.BBP_PRODUCT);
        setCart({});
        setCoupon(null);
      }
    }, [success, setCart, setCoupon]);

    return (
      <Fragment>
        <div className={styles.Confirm__success_payment}>
          <div className="container">
            <h2 className={styles.Confirm__heading}>
              Your payment transaction was successful
            </h2>
            <p className={styles.Confirm__text}>
              A confirmation was sent to <strong>{email}</strong> with the
              details of your payment and a <strong>download link.</strong>
            </p>
            <p className={styles.Confirm__text}>
              A customer account has been created. You must change your
              password. Follow the steps in the email.
            </p>
            <p>
              <svg
                className={styles.Confirm__success__icon}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ margin: "0 0 0 -0.45rem" }}
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
              <Link href="/" className={`link ${styles.Confirm__success_link}`}>
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Container as="main" fluid className={styles.Confirm__mainContainer}>
      <Suspense>
        <ConfirmWrapper />
      </Suspense>
    </Container>
  );
}
