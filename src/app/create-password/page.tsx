"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Fragment, Suspense } from "react";
import styles from "@/styles/Register.module.scss";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { updateUserPassword } from "@/services/Api";
import { useFocus } from "@/hooks/useHasFocus";
import { useFormik } from "formik";
import { PASSWORD, SESSION } from "@/constants/index";
import CoverImage from "@/components/CoverImage/CoverImage";
import CreatePasswordForm from "@/components/Forms/Create/CreatePassword";

export default function CreatePassword() {
  const CreatePasswordWrapper = () => {
    const params = useSearchParams();

    const session = params?.get("sessionID");
    const userId = params?.get("userID");
    const email = params?.get("email");

    const { onVisibilityChange } = useFocus();

    const [formSubmit, setFormSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [_, setFormSubmitted] = useState(false);

    useEffect(() => {
      if (session) {
        localStorage.setItem(SESSION.SESSION_BBP, JSON.stringify(session));
      }
      onVisibilityChange();
    }, [session, onVisibilityChange]);

    const { handleSubmit, setFieldValue } = useFormik({
      initialValues: {
        password: "",
        passwordConfirm: "",
      },
      onSubmit: async (values) => {
        console.log(values);
        setIsLoading(true);
        setFormSubmitted(true);

        if (values.password === values.passwordConfirm) {
          try {
            const newPassword = values.password;

            const response = await updateUserPassword({
              email,
              newPassword,
              userId,
            });
            if (response.data) {
              setFormSubmit(true);
            }
          } catch (error: any) {
            toast.error(error.message);
          } finally {
            setIsLoading(false);
          }
        } else {
          toast.warn(PASSWORD.PASSWORD_NOT_MATCH);
        }
      },
    });

    return (
      <Fragment>
        <div className="content__main">
          {!formSubmit ? (
            <Fragment>
              <h1 className={styles.Register__heading}>Create password</h1>
              <p className={styles.Register__subHeading}>
                Create a password to complete your account creation
              </p>
              <div className={styles.Register__form__container}>
                <CreatePasswordForm
                  isLoading={isLoading}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                />
              </div>
            </Fragment>
          ) : (
            <div className={styles.Register__confirm}>
              <h2 className={styles.Register__confirm__heading}>Success!</h2>
              <p className={styles.Register__subHeading}>
                Your password has been created successfully{" "}
                <Link
                  href="/login"
                  className={`${styles.Register__link} link-blue`}
                >
                  Sign-In
                </Link>
              </p>
              <hr />
            </div>
          )}
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <CoverImage />
      <Suspense>
        <Container as="main" className="container">
          <CreatePasswordWrapper />
        </Container>
      </Suspense>
    </Fragment>
  );
}
