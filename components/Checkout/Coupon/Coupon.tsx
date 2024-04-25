import { useContext, Fragment } from "react";

import styles from "@/styles/Coupon.module.scss";
import { Button, Form, FormControl } from "react-bootstrap";

import { CartContext, TCartContext } from "@/context/CartContext";
import { CouponContext, TCouponContext } from "@/context/CouponContext";

import { throttle } from "util/index";

function Coupon({ isTokenValid, handleApplyCoupon }) {
  const { cart } = useContext<TCartContext>(CartContext);
  const { couponValue, setCouponValue } =
    useContext<TCouponContext>(CouponContext);

  const coupon_applied =
    cart && Object.keys(cart).length ? cart.coupon?.applied : undefined;

  return (
    <Fragment>
      <h5 className={styles.Coupon__heading}>Add Coupon</h5>
      <Form className={styles.Coupon__form}>
        <div className={`mb-1 input-group ${styles.Coupoon__input_group}`}>
          <FormControl
            type="search"
            name="coupon"
            className={`form-control ${styles.Coupon__input}`}
            id="coupon"
            value={couponValue}
            aria-describedby="coupon"
            placeholder="Coupon"
            onChange={(event) => setCouponValue(event.target.value)}
            disabled={coupon_applied ? true : false}
          />
          <Button
            type="button"
            className="btn btn-primary"
            disabled={coupon_applied ? true : false}
            onClick={(event) => handleApplyCoupon(couponValue)}
          >
            Apply
          </Button>
        </div>
        <div className={styles.Coupon__errorContainer}>
          {coupon_applied ? (
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z" />
            </svg>
          ) : isTokenValid && isTokenValid !== null ? (
            <svg
              className={styles.Coupon__error}
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                fillRule="nonzero"
              />
            </svg>
          ) : (
            !coupon_applied && null
          )}
        </div>
      </Form>
    </Fragment>
  );
}
export default Coupon;
