"use client";
import Select from "react-select";
import { useStates } from "react-us-states";
import styles from "@/styles/Checkout.module.scss";
import countryList from "react-select-country-list";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback, useContext } from "react";
import { Form, FormControl, InputGroup, Row } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { useFormik } from "formik";
import AccordionPay from "@/components/Checkout/Accordion/AccordionPay";
import { CARD, METHOD } from "@/constants/index";
import PayPalButtonCheckout from "@/components/Forms/Checkout/Button/PayPalButtonCheckout";
import SubmitPaymentStripeButton from "@/components/Forms/Checkout/Button/SubmitPaymentStripeButton";

import { CouponContext, TCouponContext } from "@/context/CouponContext";

import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";

import { object, string } from "yup";
import { toast } from "react-toastify";

const CheckoutSchema = object().shape({
  email: string().email("Must be a valid email").required(),
  country: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  address: string().required(),
  apartment: string().required(),
  city: string().required(),
  zip: string().required(),
  state: string().required(),
});

export default function CheckoutForm({ purchaseUnits }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [countryValue] = useState({});
  const [usStates] = useState({});
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [paymentType, setPaymentType] = useState(CARD.CREDIT_CARD);
  const [processing, setProcessing] = useState(false);

  const { coupon } = useContext<TCouponContext>(CouponContext);

  const createQueryString = useCallback(
    (
      success: string,
      successValue: string,
      email: string,
      emailValue: string,
      orderID: string,
      orderIDValue: string
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(success, successValue);
      params.set(email, emailValue);
      params.set(orderID, orderIDValue);

      return params.toString();
    },
    [searchParams]
  );

  const { values, handleSubmit, handleChange, setFieldValue, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        zip: "",
        state: "",
        country: "",
        card: false,
        expiration: false,
        securityCode: false,
        nameOnCard: "",
      },
      validationSchema: CheckoutSchema,
      onSubmit: async (values) => {
        setProcessing(true);

        const cardElement = elements?.getElement(CardNumberElement);

        if (!stripe || !cardElement) return null;

        const name = values.firstName + " " + values.lastName;
        const email = values.email;
        const username = values.email;
        const address = values.address;
        const city = values.city;
        const state = values.state;
        const zip = values.zip;
        const country_code = values.country;

        const payload = JSON.stringify({
          name,
          email,
          username,
          address,
          city,
          state,
          postal_code: zip,
          country_code,
          payment_method: METHOD.METHOD_STRIPE,
          purchaseUnits,
          coupon: coupon?.isApplied ? coupon.code : null,
        });

        try {
          const response = await fetch("/api/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
          });

          const data = await response.json();

          if (!response.ok) {
            toast.error(data.message);
            return;
          }

          const clientSecret = data.clientSecret;

          const res = await stripe?.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement },
          });

          if (res.paymentIntent) {
            setProcessing(false);

            router.push(
              "/confirm" +
                "?" +
                createQueryString(
                  "success",
                  "true",
                  "email",
                  values.email,
                  "transactionID",
                  res.paymentIntent.id
                )
            );
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      },
    });

  const states = useStates().map((state) => state);
  const newStates = states.map(({ name, abbreviation }) => ({
    name,
    abbreviation,
  }));

  const updatedStates = useMemo(
    () =>
      newStates.map((state) => {
        return {
          label: state.name,
          value: state.abbreviation,
        };
      }),
    [newStates]
  );

  return (
    <Form style={{ margin: "0 0 4rem 0" }} onSubmit={handleSubmit}>
      <h5 className={styles.Checkout_heading}>Contact</h5>
      <InputGroup className="mb-2">
        <FormControl
          type="email"
          id="email"
          name="email"
          className={`form-control ${
            touched.email && errors.email ? "error" : null
          }`}
          aria-describedby="emailHelp"
          placeholder="Email"
          onChange={handleChange}
          value={values?.email}
          style={{ fontSize: "0.9rem", height: "47px" }}
          autoFocus
        />
      </InputGroup>

      <InputGroup>
        <Form.Check onChange={handleChange} type="checkbox" id="form-check" />
        <label
          style={{ display: "flex", alignItems: "center" }}
          className="form-check-label"
          htmlFor="form-check"
        >
          Email me with news and offers
        </label>
      </InputGroup>

      <h5 className={styles.Checkout_heading}>Payment</h5>
      <p style={{ fontSize: "0.9rem", fontWeight: 100 }}>
        All transactions are secure and encrypted.
      </p>

      <AccordionPay
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        setPaymentType={setPaymentType}
        setFieldValue={setFieldValue}
      />

      <h5 className={styles.Checkout_heading} style={{ fontSize: "1rem" }}>
        Billing Address
      </h5>

      <InputGroup className="mb-3">
        <Select
          id="country"
          name="country"
          defaultValue={{ label: "Country/Region", value: "" }}
          options={countryOptions}
          instanceId="long-value-select"
          val={countryValue}
          onChange={(option) => setFieldValue("country", option?.value)}
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
            option: (baseStyles) => ({
              ...baseStyles,
            }),
            control: (baseStyles) => ({
              ...baseStyles,
              height: "47px",
              fontSize: "0.9rem",
              borderColor:
                touched.country && errors.country ? "red" : "#dee2e6",
            }),
          }}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <FormControl
          onChange={handleChange}
          type="text"
          name="firstName"
          className={`form-control  ${
            touched.firstName && errors.firstName ? "error" : null
          }`}
          id="firstName"
          aria-describedby="firstName"
          placeholder="First Name"
          style={{ fontSize: "0.9rem", height: "47px" }}
        />
        <FormControl
          onChange={handleChange}
          type="text"
          name="lastName"
          className={`form-control  ${
            touched.lastName && errors.lastName ? "error" : null
          }`}
          id="lastName"
          aria-describedby="lastName"
          placeholder="Last Name"
          style={{ fontSize: "0.9rem", height: "47px" }}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API}
          selectProps={{
            id: "address",
            name: "address",
            onChange: (option) => setFieldValue("address", option?.label),
            placeholder: "Address",
            styles: {
              control: (baseStyles) => ({
                ...baseStyles,
                boxShadow: "none",
                borderColor:
                  touched.address && errors.address ? "red" : "#dee2e6",
                "&:hover": {
                  borderColor: "hsl(0, 0%, 70%)",
                },
              }),
              container: (provided) => ({
                ...provided,
                width: "100%",
              }),
              input: (provided) => ({
                ...provided,
                fontWeight: 100,
                color: "black",
                fontSize: "0.9rem",
                height: "36px",
              }),
              placeholder: (provided) => ({
                ...provided,
                fontWeight: 100,
              }),
              singleValue: (provided) => ({
                ...provided,
                fontWeight: 100,
              }),
              option: (provided) => ({
                ...provided,
                fontWeight: 100,
              }),
            },
          }}
        />

        {/* <FormControl
          onChange={handleChange}
          type="search"
          name="address"
          className={`form-control`}
          id="address"
          aria-describedby="address"
          placeholder="Address"
          required
        /> */}
      </InputGroup>

      <InputGroup className="mb-3">
        <FormControl
          onChange={handleChange}
          type="text"
          name="apartment"
          className={`form-control  ${
            touched.apartment && errors.apartment ? "error" : null
          }`}
          id="apartment"
          aria-describedby="emailHelp"
          placeholder="Apartment, Suite (Optional)"
          style={{ fontSize: "0.9rem", height: "47px" }}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <FormControl
          onChange={handleChange}
          type="text"
          id="city"
          name="city"
          className={`form-control  ${
            touched.city && errors.city ? "error" : null
          }`}
          aria-describedby="emailHelp"
          placeholder="City"
          style={{ fontSize: "0.9rem", height: "47px" }}
        />
        <FormControl
          type="text"
          onChange={handleChange}
          name="zip"
          className={`form-control  ${
            touched.zip && errors.zip ? "error" : null
          }`}
          id="zip"
          aria-describedby="zip"
          placeholder="Zip Code"
          style={{ fontSize: "0.9rem", height: "47px" }}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Select
          id="state"
          name="state"
          defaultValue={{ label: "Select State" }}
          options={updatedStates}
          val={usStates}
          onChange={(option) => setFieldValue("state", option?.label)}
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
            control: (baseStyles) => ({
              ...baseStyles,
              height: "47px",
              fontSize: "0.9rem",
              borderColor: touched.state && errors.state ? "red" : "#dee2e6",
            }),
          }}
        />
      </InputGroup>

      <Row className="row mb-3">
        <div className="d-grid col-sm-12 col-md-12">
          {paymentType === CARD.CREDIT_CARD ? (
            <SubmitPaymentStripeButton processing={processing} />
          ) : paymentType === METHOD.METHOD_PAYPAL ? (
            <PayPalButtonCheckout
              values={values}
              purchaseUnits={purchaseUnits}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </div>
      </Row>
    </Form>
  );
}
