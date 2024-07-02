"use client";
import { Fragment } from "react";
import styles from "@/styles/SignIn.module.scss";

import CoverImage from "@/components/CoverImage/CoverImage";
import LoginForm from "@/components/Forms/Login/LoginForm";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function Login() {
  return (
    <Fragment>
      <>
        <CoverImage />
        <div className="container">
          <div className="content__main">
            <h1 className={styles.SignIn__heading}>Sign In</h1>
            <p className={styles.SignIn__subHeading}>
              Sign in to your customer account
            </p>

            <div className={styles.SignIn__form__container}>
              <LoginForm />
              <hr />
            </div>

            <div className="mt-3">
              <h2 className={styles.Signin__register}>Not registered?</h2>
              <p style={{ fontWeight: 100 }}>
                <OverlayTrigger
                  trigger="click"
                  key={"right"}
                  placement={"right"}
                  overlay={
                    <Popover id={`popover-positioned-${"right"}`}>
                      <Popover.Body>
                        After you make your first purchase you can create a
                        password for your account. An email will be sent to you
                        after an order. Having an account allows you to be
                        elligible for deals through coupons.
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <div className={styles.Signin__info_button}>
                    Make your first purchase to create an account{" "}
                    <i
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      className="bi bi-info-circle-fill"
                      style={{ fontSize: "15px" }}
                    ></i>
                  </div>
                </OverlayTrigger>
              </p>
            </div>
          </div>
        </div>
      </>
    </Fragment>
  );
}
