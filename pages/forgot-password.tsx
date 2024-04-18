import { AxiosError } from "axios";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import styles from "@/styles/LostPw.module.scss";
import CoverImage from "@/components/CoverImage/CoverImage";
import Spinner from "@/components/Spinner/Spinner";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Button, Form, FormControl } from "react-bootstrap";
import { sendPasswordReset, updateUserPassword } from "@/services/Api";
import EyeTogglePasswordIcon from "@/components/Icons/EyeTogglePasswordIcon";
import { EMAIL_NOT_PROVIDED } from "@/util/constants";

export default function LostPassword() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [formSubmit2, setFormSubmit2] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formCodeSubmitted, setFormCodeSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      code: "",
      email: "",
      newPassword: "",
    },
    onSubmit: async (values) => {
      setFormSubmitted(true);

      if (!formSubmitted) {
        if (values.email === "") {
          toast.warn(EMAIL_NOT_PROVIDED);
          return;
        }
        try {
          const response = await sendPasswordReset(values.email);
          setFormSubmit(true);
          toast.success(response.message);
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
          }
        }
      }
    },
  });

  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => setFormSubmitted(false), 6000);
    } else if (formCodeSubmitted) {
      setTimeout(() => setFormCodeSubmitted(false), 6000);
    }
  }, [formSubmitted, formCodeSubmitted]);

  const handleSetNewPassword = async (event: FormEvent) => {
    event.preventDefault();
    setFormCodeSubmitted(true);
    setIsLoading(true);

    if (!formCodeSubmitted) {
      try {
        const email = values.email;
        const newPassword = values.newPassword;
        const code = values.code;
        const response = await updateUserPassword({ email, newPassword, code });
        if (response.status === 200) {
          setFormSubmit2(true);
          toast.success(response.data.message);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <CoverImage />
      <div className="container">
        <div className="content__main">
          {!formSubmit ? (
            <>
              <h1 className={styles.Lostpw__heading}>Forgot Password</h1>
              <p style={{ fontWeight: 100 }}>
                Enter your email to reset your password
              </p>
              <div className={styles.LostPw__container}>
                <Form method="post" onSubmit={handleSubmit}>
                  <div className="mb-2 input-group">
                    <FormControl
                      autoFocus
                      type="email"
                      id="email"
                      name="email"
                      aria-describedby="email"
                      placeholder="Enter your email address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <Button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </Form>

                <hr />
              </div>

              <div className="mt-3">
                <h2 className={styles.LostPw__signIn}>
                  Back to sign in{" "}
                  <Link href="/login">
                    <a className={`${styles.LostPw__link} link`}>here</a>
                  </Link>
                </h2>
              </div>
            </>
          ) : (
            <>
              {formSubmit2 ? (
                <>
                  <h5>Password has been reset</h5>
                  <p style={{ fontWeight: 100 }}>
                    Your password has been reset successfully. Click{" "}
                    <Link href="/login">here</Link> to sign in.
                  </p>
                </>
              ) : (
                <>
                  <h5>Check your email</h5>
                  <p style={{ fontWeight: 100 }}>
                    A 4-digit code has been sent to your email
                  </p>
                  <div className={styles.LostPw__container}>
                    <Form method="post" onSubmit={handleSetNewPassword}>
                      <div className="mb-2 input-group">
                        <FormControl
                          required
                          autoFocus
                          id="code"
                          type="text"
                          name="code"
                          onChange={handleChange}
                          aria-describedby="code"
                          placeholder="Enter 4-digit code"
                        />
                        <FormControl
                          required
                          id="email"
                          type="text"
                          name="email"
                          aria-describedby="email"
                          placeholder="Enter your email address"
                          onChange={handleChange}
                        />
                      </div>
                      <div style={{ position: "relative" }}>
                        <EyeTogglePasswordIcon left={null} right={"1rem"} />
                        <div className="mb-2 input-group">
                          <FormControl
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            aria-describedby="password"
                            placeholder="Enter a new password"
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
                            Reset
                            {isLoading && (
                              <span style={{ margin: "0 0 0 0.3rem" }}>
                                <Spinner />
                              </span>
                            )}
                          </Button>
                        </div>
                        <div className="mt-3">
                          <hr />
                          <h2 className={styles.LostPw__signIn}>
                            Back to request code{" "}
                            <Link href="#">
                              <a
                                className={styles.LostPw__link}
                                onClick={(e) => setFormSubmit(false)}
                              >
                                here
                              </a>
                            </Link>
                          </h2>
                        </div>
                      </div>
                    </Form>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
