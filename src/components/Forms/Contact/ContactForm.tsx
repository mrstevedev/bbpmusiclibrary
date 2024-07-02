"use client";
import { useState } from "react";
import Select from "react-select";
import styles from "@/styles/Contact.module.scss";

import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { sendMessage } from "@/services/Api";
import { FORM_ISSUES_OPTIONS } from "@/constants/index";

export default function ContactForm() {
  const [formSubmit, setFormSubmit] = useState(false);

  const { handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      issue: "",
      message: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      try {
        const response_message = await sendMessage({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          issue: values.issue,
          message: values.message,
        });
        if (response_message.data) {
          setFormSubmit(true);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      }
    },
  });

  return (
    <div className={styles.BBP_Contact__Form}>
      <div className="content__main">
        {!formSubmit ? (
          <>
            <h1 className={styles.BBP_Contact_Form__Text}>Contact the team</h1>
            <p>Are you having issues? Let us know so we can help</p>
            <Row>
              <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-2">
                  <FormControl
                    autoFocus
                    required
                    type="text"
                    name="firstName"
                    className="form-control first-name-input"
                    id="firstName"
                    aria-describedby="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                  <FormControl
                    required
                    type="text"
                    name="lastName"
                    className="form-control last-name-input"
                    id="lastName"
                    aria-describedby="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <FormControl
                    required
                    type="email"
                    name="email"
                    className="form-control email-name-input"
                    id="email"
                    aria-describedby="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <Select
                    id="issue"
                    name="issue"
                    defaultValue={{ label: "What is your issue" }}
                    aria-label="What is your issue"
                    options={FORM_ISSUES_OPTIONS}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: "#f1f1f1",
                        primary: "black",
                      },
                    })}
                    styles={{
                      container: (baseStyles) => ({
                        ...baseStyles,
                        width: "100%",
                      }),
                    }}
                    onChange={(option) => setFieldValue("issue", option)}
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <FormControl
                    name="message"
                    as="textarea"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please include your order # in this message"
                  ></FormControl>
                </InputGroup>
                <Row>
                  <Col>
                    <Button type="submit" className="btn btn-primary btn-block">
                      Send message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          </>
        ) : (
          <>
            <h4>Your message has been sent.</h4>
            <p>Please allow up to 3 business days to process your request.</p>
          </>
        )}
        <hr />
      </div>
    </div>
  );
}
