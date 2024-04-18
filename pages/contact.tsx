import Head from "next/head";
import { useState } from "react";

import styles from "@/styles/Contact.module.scss";

import ImageHero from "@/components/Hero/ImageHero";
import AboutParagraph from "@/components/About/AboutParagraph";

import axios, { AxiosError } from "axios";
import cookie from "cookie";

import { GET_CONTACT_PAGE } from "../query";

import { sendMessage } from "@/services/Api";

import Select from "react-select";

import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";

interface IPage {
  page: {
    content: string | null;
    title: string;
    featuredImage: {
      node: {
        id: string | null;
        mediaItemUrl: string | null;
      };
    };
  };
}

export default function Contact({
  page: {
    content,
    title,
    featuredImage: {
      node: { mediaItemUrl },
    },
  },
}: IPage) {
  const [formSubmit, setFormSubmit] = useState(false);
  const { handleChange, handleSubmit } = useFormik({
    onSubmit: async (values) => {
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
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      issue: "",
      message: "",
    },
  });

  return (
    <>
      <Head>
        <title>Bonita Basics Productions | Contact</title>
        <meta
          name="description"
          content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="main" fluid className={styles.contact__mainContainer}>
        <ImageHero contact mediaItemUrl={mediaItemUrl} />
        <div className={styles.contact}>
          <div className="content__main">
            {!formSubmit ? (
              <>
                <h1 className={styles.contact__text}>Contact our team</h1>
                <p>Are you having issues? Let us know so we can help</p>
                <AboutParagraph page={content} />

                <Row className={styles.SignIn__form__container}>
                  <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-2">
                      <FormControl
                        autoFocus
                        required
                        type="text"
                        name="firstName"
                        className="form-control"
                        id="firstName"
                        aria-describedby="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                      />
                      <FormControl
                        required
                        type="text"
                        name="lastName"
                        className="form-control"
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
                        className="form-control"
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
                        options={[
                          {
                            label:
                              "I am unable to download my purchased sample pack",
                            value: "Unable to download",
                          },
                          {
                            label: "I never received my purchased sample pack",
                            value: "never received",
                          },
                        ]}
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
                      />
                    </InputGroup>
                    <InputGroup className="mb-2">
                      <FormControl
                        name="message"
                        as="textarea"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Please tell us what issue you are having"
                      ></FormControl>
                    </InputGroup>
                    <Row>
                      <Col>
                        <Button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
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
                <p>Please allow up to 3 business days to get back to you.</p>
              </>
            )}
            <hr />
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getServerSideProps<Promise>(context: any) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const token = parsedCookies.bbp_token;

  const get_coupons_response = await fetch(
    process.env.NEXT_PUBLIC_COUPONS_URL as string,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const coupon: Awaited<Promise> = await get_coupons_response.json();

  const res = await axios.post(process.env.GRAPHQL_URL as string, {
    query: GET_CONTACT_PAGE,
  });
  const json = await res.data;

  return {
    props: {
      page: json.data.page,
      coupon: coupon,
    },
  };
}
