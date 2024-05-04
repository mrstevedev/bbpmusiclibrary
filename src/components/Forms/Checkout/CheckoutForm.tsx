import Select from "react-select";
import { useState, useMemo } from "react";
import { useStates } from "react-us-states";
import styles from "@/styles/Checkout.module.scss";
import countryList from "react-select-country-list";
import SubmitPaymentButton from "src/components/Buttons/SubmitPaymentsButton";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Form, FormControl, InputGroup, Row } from "react-bootstrap";

export default function CheckoutForm({
  values,
  handleSubmit,
  handleChange,
  setFieldValue,
}) {
  const [countryValue] = useState({});
  const [usStates] = useState({});
  const countryOptions = useMemo(() => countryList().getData(), []);

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
          value={values?.email}
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
    </Form>
  );
}
