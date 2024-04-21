import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "@/styles/SignIn.module.scss";

import CoverImage from "@/components/CoverImage/CoverImage";
import Spinner from "@/components/Spinner/Spinner";
import { AuthContext, TAuthContext } from "@/context/AuthContext";

import { authUserLogin } from "@/services/Api";

import * as Yup from "yup";
import { useFormik } from "formik";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Button } from "react-bootstrap";

import EyeToggleIcon from "@/components/Icons/EyeTogglePasswordIcon";
import { AxiosError } from "axios";
import { throttle } from "../util/index";

export default function Login() {
  const router = useRouter();
  const { auth, setAuth } = useContext<TAuthContext>(AuthContext);

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
        const response_login = await authUserLogin({
          username: values.username,
          password: values.password,
        });

        if (response_login.error?.message) {
          const stripped = response_login.error.message.replace(
            /<[^>]*>?/gm,
            ""
          );
          const removed = stripped?.replace(/Lost your password\?/, "");
          !formSubmitted ? toast.error(removed) : null;
          return;
        }

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
        router.push("/");
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
    if (auth !== null) {
      router.push("/");
    }
  }, [auth]);

  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => setFormSubmitted(false), 6000);
    }
  }, [formSubmitted]);

  return (
    <>
      <CoverImage />
      <div className="container">
        <div className="content__main">
          <h1 className={styles.SignIn__heading}>Sign In</h1>
          <p className={styles.SignIn__subHeading}>
            Sign in to your customer account
          </p>

          <div className={styles.SignIn__form__container}>
            <form id="my-form" onSubmit={handleSubmit}>
              <div style={{ position: "relative" }}>
                <OverlayTrigger
                  key="right"
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-right`}>Username or Email</Tooltip>
                  }
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
                    className={`form-control`}
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
                    className={`form-control`}
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
                    <Link href="/forgot-password">
                      <a className="link">Forgot password?</a>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
            <hr />
          </div>

          <div className="mt-3">
            <h2 className={styles.Signin__register}>Not registered?</h2>
            <p style={{ fontWeight: 100 }}>
              Make your first purchase to create an account.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
