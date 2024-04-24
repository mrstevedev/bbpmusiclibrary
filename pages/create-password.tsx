import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import CoverImage from "@/components/CoverImage/CoverImage";
import styles from "@/styles/Register.module.scss";
import { toast } from "react-toastify";
import cookie from "cookie";

import { updateUserPassword } from "@/services/Api";

import { AuthContext, TAuthContext } from "@/context/AuthContext";

import { useFocus } from "@/hooks/useHasFocus";

import * as Yup from "yup";
import { useFormik } from "formik";
import EyeTogglePasswordIcon from "@/components/Icons/EyeTogglePasswordIcon";
import EyeTogglePasswordConfirmIcon from "@/components/Icons/EyeTogglePasswordConfirmIcon";
import { PASSWORD_NOT_MATCH } from "@/util/constants";

const FormSchema = Yup.object().shape({
  password: Yup.string().required(),
  passwordConfirm: Yup.string().required(),
});

export default function Register() {
  const { auth } = useContext<TAuthContext>(AuthContext);
  const router = useRouter();

  const { nonce } = router.query;

  const { onVisibilityChange } = useFocus();

  const [formSubmit, setFormSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (nonce) {
      localStorage.setItem("bbp_nonce", JSON.stringify(nonce));
    }
    onVisibilityChange();
  }, [nonce, onVisibilityChange]);

  const { handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      code: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      setFormSubmitted(true);

      if (values.password === values.passwordConfirm) {
        try {
          const email = auth.userEmail;
          const newPassword = values.password;
          const code = values.code;

          const response = await updateUserPassword({
            email,
            newPassword,
            code,
          });
          if (response.data) {
            console.log(response);
            setFormSubmit(true);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        toast.warn(PASSWORD_NOT_MATCH);
      }
    },
  });

  return (
    <>
      <CoverImage />
      <div className="container">
        <div className="content__main">
          {!formSubmit ? (
            <>
              <h1 className={styles.Register__heading}>Create password</h1>
              <p className={styles.Register__subHeading}>
                Create a password to complete your account creation
              </p>

              <div className={styles.Register__form__container}>
                <form onSubmit={handleSubmit}>
                  <div style={{ position: "relative" }}>
                    <EyeTogglePasswordIcon left={"9.3rem"} right={null} />
                    <EyeTogglePasswordConfirmIcon
                      left={null}
                      right={"0.7rem"}
                    />
                    <div className="mb-2 input-group">
                      <input
                        required
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        aria-describedby="password"
                        placeholder="Password"
                      />
                      <input
                        required
                        onChange={(e) =>
                          setFieldValue("passwordConfirm", e.target.value)
                        }
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        className="form-control"
                        aria-describedby="confirm password"
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Create
                    {isLoading && (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                        style={{ margin: "0 0 0 0.3rem" }}
                      ></div>
                    )}
                  </button>
                </form>

                <hr />
              </div>
            </>
          ) : (
            <div className={styles.Register__confirm}>
              <h2 className={styles.Register__confirm__heading}>Success!</h2>
              <p className={styles.Register__subHeading}>
                Your password has been created successfully{" "}
                <Link href="/login">
                  <a className={`${styles.Register__link} link-blue`}>
                    {" "}
                    Sign-In
                  </a>
                </Link>
              </p>
              <hr />
            </div>
          )}

          {formSubmit ? null : (
            <div className="mt-3">
              <h2 className={styles.Register__signIn}>
                Already created a new password?{" "}
                <Link href="/login">
                  <a className={`${styles.Register__link} link-blue`}>
                    {" "}
                    Sign-In
                  </a>
                </Link>
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const parsedCookies = cookie.parse(req.headers.cookie ?? "");
  const token = parsedCookies ? parsedCookies.bbp_token : null;

  const get_coupons_response = await fetch(process.env.COUPONS_URL as string, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const coupon = await get_coupons_response.json();

  return {
    props: {
      coupon: coupon ? coupon : null,
    },
  };
}
