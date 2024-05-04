import { useContext, Fragment, useEffect } from "react";

import styles from "@/styles/Coupon.module.scss";
import { Button, Form, FormControl } from "react-bootstrap";

import { CartContext, TCartContext } from "src/context/CartContext";

export default function Coupon({
  handleApplyCoupon,
  couponValue,
  setCouponValue,
  couponApplied,
}) {
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
            disabled={couponApplied ? true : false}
          />
          <Button
            type="button"
            className="btn btn-primary"
            disabled={couponApplied ? true : false}
            onClick={handleApplyCoupon}
          >
            Apply
          </Button>
        </div>
      </Form>
    </Fragment>
  );
}
