"use client";
import Link from "next/link";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { login } from "@/services/Api";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import styles from "@/styles/SignIn.module.scss";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Fragment, useContext, useEffect, useState } from "react";

import Spinner from "@/components/Spinner/Spinner";
import EyeToggleIcon from "@/components/Icons/EyeTogglePasswordIcon";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { CouponContext, TCouponContext } from "@/context/CouponContext";

export default function LoginForm() {
  const router = useRouter();
  const { setAuth } = useContext<TAuthContext>(AuthContext);
  const { setCoupon } = useContext<TCouponContext>(CouponContext);

  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setFormSubmitted(true);
        const response_login = await login({
          username: values.username,
          password: values.password,
        });

        if (response_login.error?.message) {
          const stripped = response_login.error.message.replace(
            /<[^>]*>?/gm,
            ""
          );
          const removed = stripped?.replace(/Lost your password\?/, "");
          if (!formSubmitted) {
            toast.error(removed);
          }
        } else {
          const { id } = response_login;
          localStorage.setItem(
            "bbp_user",
            JSON.stringify({
              userId: id,
              userNiceName: response_login.user_nicename,
              userEmail: response_login.user_email,
              firstName: response_login.first_name,
              lastName: response_login.last_name,
              status: response_login.status,
              token: response_login.token,
              coupon: response_login.coupon,
            })
          );
          setAuth({
            userId: id,
            userNiceName: response_login.user_nicename,
            userEmail: response_login.user_email,
            firstName: response_login.first_name,
            lastName: response_login.last_name,
            status: response_login.status,
            token: response_login.token,
          });

          if (response_login.coupon) {
            setCoupon({
              code: response_login.coupon.code,
              description: response_login.coupon.description,
              isApplied: false,
              isUsed: false,
            });
          } else {
            setCoupon(null);
          }
          router.push("/");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => setFormSubmitted(false), 6000);
    }
  }, [formSubmitted]);

  return (
    <Fragment>
      <form id="my-form" onSubmit={handleSubmit}>
        <div style={{ position: "relative" }}>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={<Tooltip id={`tooltip-right`}>Username or Email</Tooltip>}
          >
            <i
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Username or email"
              className="bi bi-info-circle-fill"
              style={{
                fontSize: "15px",
                position: "absolute",
                zIndex: 6,
                right: "1rem",
                top: "0.5rem",
              }}
            ></i>
          </OverlayTrigger>

          <div className="mb-2 input-group">
            <input
              autoFocus
              onChange={(e) => setFieldValue("username", e.target.value)}
              type="text"
              id="username"
              name="username"
              aria-describedby="username"
              placeholder="Username"
              value={values.username}
              className={`form-control login-input`}
              required
            />
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <EyeToggleIcon left={null} right={"1rem"} />
          <div className="mb-2 input-group">
            <input
              onChange={(e) => setFieldValue("password", e.target.value)}
              type="password"
              id="password"
              name="password"
              aria-describedby="password"
              placeholder="Password"
              value={values.password}
              className={`form-control login-input`}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <Button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ display: "flex", alignItems: "center" }}
            >
              Login
              {isLoading && (
                <span style={{ margin: "0 0 0 0.3rem" }}>
                  <Spinner />
                </span>
              )}
            </Button>
          </div>
          <div className="col-sm-9 pt-2">
            <p className={styles.SignIn__forgot__text}>
              <Link href="/forgot-password" className="link">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
