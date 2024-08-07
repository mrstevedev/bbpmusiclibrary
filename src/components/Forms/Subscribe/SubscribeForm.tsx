"use client";
import { STATUS } from "@/constants/index";
import { subscribe } from "@/services/Api";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import styles from "@/styles/Subscribe.module.scss";

export default function SubscribeForm() {
  const [subscription, setSubscription] = useState(false);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const email = values.email;
      const status = STATUS.STATUS_CONFIRMED;

      try {
        const response = await subscribe(email, status);
        if (response) setSubscription(true);
      } catch (error: unknown) {}
    },
  });
  return (
    <Fragment>
      {!subscription ? (
        <Form
          method="post"
          onSubmit={handleSubmit}
          className={styles.BBP_Subscribe__Form}
        >
          <InputGroup className="mb-2">
            <FormControl
              autoFocus
              required
              type="email"
              name="email"
              className="form-control subscribe-input"
              id="email"
              aria-describedby="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-2">
            <Button type="submit" className="btn btn-primary btn-block">
              Subscribe
            </Button>
          </InputGroup>
        </Form>
      ) : (
        <h5 className={styles.BBP_Subscribe_Form__Success}>
          You are now subscribed
        </h5>
      )}
    </Fragment>
  );
}
