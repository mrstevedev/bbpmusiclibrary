"use client";
import { AxiosError } from "axios";
import { FormEvent, useState, useEffect, Fragment } from "react";
import styles from "@/styles/ForgotPassword.module.scss";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import CoverImage from "@/components/CoverImage/CoverImage";
import { sendPasswordReset, updateUserPassword } from "@/services/Api";
import ForgotStepOneForm from "@/components/Forms/Forgot/ForgotStepOneForm";
import ForgotSuccess from "@/components/Forms/Forgot/ForgotSuccess";
import ForgotStepTwoForm from "@/components/Forms/Forgot/ForgotStepTwoForm";

export default function ForgotPassword() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [formSubmit2, setFormSubmit2] = useState(false);

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [codeSubmitted, setCodeSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      code: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setEmailSubmitted(true);
      console.log(values);

      if (!emailSubmitted) {
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
    if (emailSubmitted) {
      setTimeout(() => setEmailSubmitted(false), 6000);
    } else if (codeSubmitted) {
      setTimeout(() => setCodeSubmitted(false), 6000);
    }
  }, [emailSubmitted, codeSubmitted]);

  const handleSetNewPassword = async (event: FormEvent) => {
    event.preventDefault();
    setCodeSubmitted(true);
    setIsLoading(true);
    try {
      const email = values.email;
      const newPassword = values.password;
      const code = values.code;
      const response = await updateUserPassword({
        email,
        newPassword,
        code,
      });
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
  };

  return (
    <Fragment>
      <CoverImage />
      <div className="container">
        <div className="content__main">
          <div className={styles.BBP_Forgot_Password__Container}>
            {!formSubmit ? (
              <ForgotStepOneForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : (
              <Fragment>
                {formSubmit2 ? (
                  <ForgotSuccess />
                ) : (
                  <ForgotStepTwoForm
                    isLoading={isLoading}
                    handleChange={handleChange}
                    setFormSubmit={setFormSubmit}
                    handleSetNewPassword={handleSetNewPassword}
                  />
                )}
              </Fragment>
            )}
            <hr />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
