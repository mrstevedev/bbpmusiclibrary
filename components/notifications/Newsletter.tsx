import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useState, useMemo } from "react";
import closeBtn from "@/public/images/closeBtn.svg";
import styles from "@/styles/Modal.module.scss";

import countryList from "react-select-country-list";

import Select from "react-select";

import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import { ToastContent, toast } from "react-toastify";

interface Props {
  handleCloseModal: () => void;
}

export default function Modal({ handleCloseModal }: Props) {
  const [formSubmit, setFormSubmit] = useState(false);

  const genders = [{ label: "Male" }, { label: "Female" }];
  const countryOptions = useMemo(() => countryList().getData(), []);

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      country: "",
    },
    onSubmit: async (values) => {
      const payload = JSON.stringify({
        email: values.email,
        first_name: values.name.split(" ")[0],
        last_name: values.name.split(" ")[1],
        status: "confirmed",
      });

      const newsletter_url = `${process.env.NEXT_PUBLIC_NEWSLETTER_URL}?client_key=${process.env.NEXT_PUBLIC_CLIENT_KEY}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}`;

      try {
        await axios.post(newsletter_url, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setFormSubmit(true);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.message);
        }
      }
    },
  });

  return (
    <>
      <div className={styles.modal__overlay} onClick={handleCloseModal}>
        <div className={`${styles.modal__subscription} fade-in`}>
          <div
            className={styles.modal__body}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modal__left}>
              <div className={styles.modal__modalHeader}>
                <a href="#" onClick={handleCloseModal}>
                  <Image
                    className={styles.btn__close}
                    src={closeBtn}
                    width="14"
                    height="14"
                    alt="Close cart"
                  />
                </a>
              </div>
            </div>
            <div className={styles.modal__right}>
              <div className={styles.modal__header}>
                <a href="#" onClick={handleCloseModal}>
                  <Image
                    className={styles.btn__close}
                    src={closeBtn}
                    width="14"
                    height="14"
                    alt="Close cart"
                  />
                </a>
              </div>

              <>
                <div className={styles.form__container}>
                  {!formSubmit ? (
                    <>
                      <h1>
                        Subscribe
                        <br /> To My Newsletter
                      </h1>
                      <Form id="newsletter-form" onSubmit={handleSubmit}>
                        <InputGroup className="mb-2">
                          <FormControl
                            autoFocus
                            required
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control`}
                            aria-describedby="name"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup className="mb-2">
                          <FormControl
                            required
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control`}
                            aria-describedby="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup className="mb-2">
                          <Select
                            name="gender"
                            defaultValue={{ label: "Select Gender" }}
                            options={genders}
                            onChange={(option) =>
                              setFieldValue("gender", option?.label)
                            }
                            styles={{
                              container: (baseStyles) => ({
                                ...baseStyles,
                                width: "100%",
                              }),
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="mb-2">
                          <Select
                            name="country"
                            defaultValue={{ label: "Select Country" }}
                            options={countryOptions}
                            onChange={(option) =>
                              setFieldValue("country", option?.label)
                            }
                            styles={{
                              container: (baseStyles) => ({
                                ...baseStyles,
                                width: "100%",
                              }),
                            }}
                          />
                        </InputGroup>

                        <Button
                          type="submit"
                          form="newsletter-form"
                          className="btn btn-primary col-12"
                        >
                          Subscribe
                        </Button>
                      </Form>

                      <hr />
                      <p>
                        Subscribe to my newsletter to receive notifications on
                        new download releases and offers to get sales on sample
                        packs.
                      </p>
                    </>
                  ) : (
                    <div className={styles.form__container}>
                      <h1>
                        Thank you
                        <br /> You are now subscribed!
                      </h1>
                    </div>
                  )}
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
