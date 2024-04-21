import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CoverImage from "@/components/CoverImage/CoverImage";
import styles from "@/styles/Register.module.scss";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { useFormik } from "formik";

export default function Register() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => setFormSubmitted(false), 6000);
    }
  }, [formSubmitted]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomer((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setFormSubmitted(true);
    const user = JSON.parse(localStorage.getItem("bbp_user") as string);
    const token = user?.token;

    const data = {
      first_name: customer.firstName,
      last_name: customer.lastName,
      username: customer.username,
      email: customer.email,
      password: customer.password,
      roles: "contributor",
    };

    if (customer.password === passwordConfirm) {
      try {
        if (!formSubmitted) {
          /**
           * We cannot get a token here to create user.
           * Better to refactor this file to a create username create password page.
           * Overview: When a user buys a product, we are creating a JWT on the server to allow creation of users/customers.
           * This causes the created users/customer to not know his/her password because the pw is generated at customer creation.
           * So when a customer successfully buys a product, redirect them to a /create-password page to create a password for their user.
           */
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_USERS_URL}`,
            data,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          if (response.status === 200) {
            setFormSubmit(true);
          }
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.warn("Passwords do not match");
    }
  };

  return (
    <>
      <CoverImage />
      <div className="container">
        <div className="content__main">
          {!formSubmit ? (
            <>
              <h1 className={styles.Register__heading}>Register</h1>
              <p className={styles.Register__subHeading}>
                Register an account below to stay up-to-date
              </p>

              <div className={styles.Register__form__container}>
                <form onSubmit={handleSubmit}>
                  <div className="mb-2 input-group">
                    <input
                      autoFocus
                      required
                      onChange={handleChange}
                      type="text"
                      name="firstName"
                      className={`form-control`}
                      id="firstName"
                      aria-describedby="firstName"
                      placeholder="First Name"
                    />
                    <input
                      required
                      onChange={handleChange}
                      type="text"
                      name="lastName"
                      className={`form-control`}
                      id="lastName"
                      aria-describedby="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="mb-2 input-group">
                    <input
                      required
                      onChange={handleChange}
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      aria-describedby="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-2 input-group">
                    <input
                      required
                      onChange={handleChange}
                      type="text"
                      name="username"
                      className="form-control"
                      id="username"
                      aria-describedby="username"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-2 input-group">
                    <input
                      required
                      onChange={handleChange}
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      aria-describedby="password"
                      placeholder="Password"
                    />
                    <input
                      required
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      type="password"
                      name="passwordConfirm"
                      className="form-control"
                      id="confirm password"
                      aria-describedby="confirm password"
                      placeholder="Confirm password"
                    />
                  </div>

                  <button className="btn btn-primary btn-block">
                    Register
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
              <h5 className={styles.Register__confirm__text}>
                Your account has been created successfully
              </h5>

              <hr />
            </div>
          )}

          <div className="mt-3">
            <h2 className={styles.Register__signIn}>
              Already registered? Sign-In{" "}
              <Link href="/login">
                <a className={`${styles.Register__link} link-blue`}>here</a>
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
