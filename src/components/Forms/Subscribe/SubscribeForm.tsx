"use client";
import { STATUS_CONFIRMED } from "@/constants/index";
import { subscribe } from "@/services/Api";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

export default function SubscribeForm() {
  const [subscription, setSubscription] = useState(false);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const email = values.email;
      const status = STATUS_CONFIRMED;

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
          style={{ margin: "1rem 0" }}
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
        <h5 style={{ margin: "1rem 0" }}>You are now subscribed</h5>
      )}
    </Fragment>
  );
}
