import Link from "next/link";
import Image from "next/image";
import React, { useState, useMemo, useContext } from "react";

import styles from "@/styles/Checkout.module.scss";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useStates } from "react-us-states";

import { CartContext, TCartContext } from "@/context/CartContext";

import SubmitPaymentButton from "@/components/Buttons/SubmitPaymentButton";
import PaymentSteps from "@/components/Checkout/PaymentSteps";
import ExpressCheckout from "@/components/Checkout/ExpressCheckout";
import SidebarCart from "@/components/Checkout/SidebarCart";
import Toast from "@/components/Notifications/Toast";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import cookie from "cookie";

import logo from "@/public/images/logo.svg";

import { useFormik } from "formik";

import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { TProduct } from "@/types/types";

export default function Checkout({ coupon }) {
  const { cart } = useContext<TCartContext>(CartContext);

  const products = cart && Object.keys(cart).length ? cart.products : [];

  const price =
    null != cart && Object.keys(cart).length ? cart.totalProductsPrice : 0;

  const productsCount =
    null != cart && Object.keys(cart).length ? cart.totalProductsCount : 0;

  const productName =
    null != cart && Object.keys(cart).length ? cart.products[0]?.name : "";

  const databaseId =
    null != cart && Object.keys(cart).length ? cart.products[0]?.databaseId : 0;

  const [countryValue] = useState({});
  const [usStates] = useState({});
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [addItemToast, setAddItemToast] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const [toggle, setToggle] = useState(false);

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
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
    },
    onSubmit: async (values) => {
      console.log("Submit form", values);
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

  const handleToggleOrderSummary = () => {
    setToggle((prev) => !prev);
  };

  return (
    <Container>
      <div className={styles.Checkout__left}>
        <Toast addItemToast={addItemToast} />
        <div className="d-flex justify-content-center">
          <div className="row">
            <Link href="/">
              <a className={styles.Checkout__logo}>
                <Image
                  src={logo}
                  height="70"
                  alt="Bonita Basics Productions Logo"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.Checkout__mobile_top}>
          <aside role="complementary">
            <Button
              onClick={handleToggleOrderSummary}
              className={`${styles["order__summary_toggle"]}`}
              aria-expanded="false"
              aria-controls="order-summary"
              data-drawer-toggle="[data-order-summary]"
              aria-hidden="false"
            >
              <span className={styles.wrap}>
                <span className={styles.order__summary__toggle__inner}>
                  <span className="order-summary-toggle__icon-wrapper">
                    <svg
                      width="20"
                      height="19"
                      xmlns="http://www.w3.org/2000/svg"
                      className="order-summary-toggle__icon"
                    >
                      <path d="M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z"></path>
                    </svg>
                  </span>
                  {/* order-summary-toggle__text order-summary-toggle__text--show */}
                  <span className={styles.order__summary__toggle__text}>
                    <span
                      className={styles.order__summary__toggle__text__inner}
                    >
                      Show order summary
                    </span>
                    <svg
                      width="11"
                      height="6"
                      xmlns="http://www.w3.org/2000/svg"
                      className="order-summary-toggle__dropdown"
                      fill="#000"
                    >
                      <path d="M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z"></path>
                    </svg>
                  </span>
                  <span
                    className={`${styles["order__summary__toggle__text"]} ${styles["Checkout__order__summary__toggle__text__hide"]}`}
                  >
                    <span
                      className={styles.order__summary__toggle__text__inner}
                    >
                      Hide order summary
                    </span>
                    <svg
                      width="11"
                      height="7"
                      xmlns="http://www.w3.org/2000/svg"
                      className="order-summary-toggle__dropdown"
                      fill="#000"
                    >
                      <path d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                    </svg>
                  </span>
                  <dl
                    className="order-summary-toggle__total-recap total-recap"
                    data-order-summary-section="toggle-total-recap"
                  >
                    <dt className="visually-hidden">
                      <span>Sale price</span>
                    </dt>
                    <dd>
                      <span
                        className="order-summary__emphasis total-recap__final-price skeleton-while-loading"
                        data-checkout-payment-due-target="2999"
                      >
                        ${price}
                      </span>
                    </dd>
                  </dl>
                </span>
              </span>
            </Button>
          </aside>

          <aside
            className={`${styles.Checkout__mobile_product_dropdown} dropdown ${
              toggle ? styles.Checkout__mobile_product_dropdown_show : ""
            }`}
            role="complementary"
          >
            {products
              ? products.map((product: TProduct) => (
                  <div key={product["databaseId"]}>
                    <div className={styles.Checkout__mobile_product}>
                      <div className={`${styles.Checkout__mobile_product_img}`}>
                        <span className="cart-count-mobile">
                          {product["qty"]}
                        </span>
                        <Link href={`/product/${product["slug"]}`}>
                          <a>
                            <Image
                              src={product["image"]}
                              width="91"
                              height="91"
                              alt={product["name"]}
                            />
                          </a>
                        </Link>
                      </div>
                      <div className={styles.Checkout__mobile_product_name}>
                        <h3 className={styles.Checkout__right_product_name_txt}>
                          <Link href={`/product/${product["slug"]}`}>
                            <a>{product.name}</a>
                          </Link>
                          <span>${product["price"]}</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              : "There are no items in your cart"}
          </aside>
        </div>

        <PaymentSteps />

        <ExpressCheckout
          price={price}
          coupon={coupon}
          databaseId={databaseId}
          productName={productName}
        />

        <div
          className="alternative-payment-separator"
          data-alternative-payment-separator=""
        >
          <span className="alternative-payment-separator__content">OR</span>
        </div>
        <Form id="my-form" onSubmit={handleSubmit}>
          <h3 className={styles.Checkout_heading}>Contact</h3>
          <InputGroup className="mb-2">
            <FormControl
              type="email"
              id="email"
              name="email"
              className={`form-control`}
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
              autoFocus
              required
            />
          </InputGroup>

          <InputGroup>
            <Form.Check onChange={handleChange} type="checkbox" />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Email me with news and offers
            </label>
          </InputGroup>

          <h3 className={styles.Checkout_heading}>Billing Address</h3>
          <InputGroup className="mb-3">
            <Select
              id="country"
              name="country"
              defaultValue={{ label: "Country/Region" }}
              options={countryOptions}
              instanceId="long-value-select"
              val={countryValue}
              onChange={(option) => setFieldValue("country", option)}
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
                  borderColor: "#dee2e6",
                }),
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              onChange={handleChange}
              type="text"
              name="firstName"
              className={`form-control`}
              id="firstName"
              aria-describedby="firstName"
              placeholder="First Name"
              required
            />
            <FormControl
              onChange={handleChange}
              type="text"
              name="lastName"
              className={`form-control`}
              id="lastName"
              aria-describedby="lastName"
              placeholder="Last Name"
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API}
              selectProps={{
                onChange: (option) => setFieldValue("select", option),
                placeholder: "Address",
                styles: {
                  control: (baseStyles) => ({
                    ...baseStyles,
                    boxShadow: "none",
                    borderColor: "#dee2e6",
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
              className={`form-control`}
              id="apartment"
              aria-describedby="emailHelp"
              placeholder="Apartment, Suite (Optional)"
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              onChange={handleChange}
              type="text"
              name="city"
              className={`form-control`}
              id="city"
              aria-describedby="emailHelp"
              placeholder="City"
              required
            />
            <FormControl
              type="text"
              onChange={handleChange}
              name="zip"
              className={`form-control`}
              id="zip"
              aria-describedby="zip"
              placeholder="Zip Code"
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Select
              id="state"
              name="state"
              defaultValue={{ label: "Select State" }}
              options={updatedStates}
              val={usStates}
              onChange={(option) => setFieldValue("state", option)}
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
                  borderColor: "#dee2e6",
                }),
              }}
            />
          </InputGroup>

          <Row className="row mb-3">
            <div className="d-grid col-sm-12 col-md-12">
              <SubmitPaymentButton />
            </div>
          </Row>

          <footer className="footer__checkout">
            <p>All rights reserved BBPSampleLibrary</p>
          </footer>
        </Form>
      </div>

      <SidebarCart
        coupon={coupon}
        products={products}
        productsCount={productsCount}
        totalProductsPrice={price}
        setAddItemToast={setAddItemToast}
      />
    </Container>
  );
}

export async function getServerSideProps({ req }) {
  const parsedCookies = cookie.parse(req.headers.cookie);
  const token = parsedCookies ? parsedCookies.bbp_token : null;

  const get_coupons_response = await fetch(process.env.COUPONS_URL as string, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const coupon = await get_coupons_response.json();

  return {
    props: {
      coupon: coupon ? coupon : null,
    },
  };
}
