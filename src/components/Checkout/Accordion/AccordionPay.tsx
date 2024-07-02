/**
 * Custom Payment Accordion
 * Radio selection of Paypal or Credit Card
 */
"use client";

import { Fragment } from "react";
import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { FormControl, InputGroup, Form } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CreditCardsAccepted from "@/components/Checkout/Accordion/Cards/CreditCardsAccepted";

import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";

//!! TODO - Move loadStrip to root of application - Create Provider component

const CARD_OPTIONS = {
  showIcon: true,
  style: {
    base: {
      iconColor: "#333",
      color: "#333",
      fontWeight: 500,
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
    },
    invalid: {
      iconColor: "#f00",
      color: "#f00",
    },
  },
};

export default function AccordionPay({
  handleChange,
  setPaymentType,
  errors,
  touched,
  setFieldValue,
}) {
  return (
    <Accordion defaultActiveKey="0" style={{ margin: "1rem 0" }}>
      <Card>
        <Card.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <ContextAwareToggle eventKey="0" setPaymentType={setPaymentType}>
              Credit card
            </ContextAwareToggle>
          </div>
          <CreditCardsAccepted />
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="p-3">
            <InputGroup className="mb-3 px-1">
              <div className="w-100">
                <CardNumberElement
                  options={CARD_OPTIONS}
                  className={`form-control ${
                    touched.email && errors.email ? "error" : null
                  }`}
                  onChange={(e) => setFieldValue("card", e.complete)}
                />
                <InputGroup.Text
                  className={`form-control ${
                    touched.email && errors.email ? "error" : null
                  }`}
                  style={{
                    position: "absolute",
                    right: "4px",
                    top: "0px",
                    width: "45px",
                    height: "100%",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: "3px",
                    borderBottomRightRadius: "3px",
                  }}
                >
                  <FaLock />
                </InputGroup.Text>
              </div>
            </InputGroup>
            <InputGroup className="mb-3">
              <div className="w-50 px-1">
                <CardExpiryElement
                  options={CARD_OPTIONS}
                  className={`form-control ${
                    touched.email && errors.email ? "error" : null
                  }`}
                  onChange={(e) => setFieldValue("expiration", e.complete)}
                />
              </div>
              <div className="w-50 px-1" style={{ position: "relative" }}>
                <CardCvcElement
                  options={CARD_OPTIONS}
                  className={`form-control ${
                    touched.email && errors.email ? "error" : null
                  }`}
                  onChange={(e) => setFieldValue("securityCode", e.complete)}
                />

                <InputGroup.Text
                  className={`form-control ${
                    touched.email && errors.email ? "error" : null
                  }`}
                  style={{
                    position: "absolute",
                    right: "4px",
                    top: "0px",
                    width: "45px",
                    height: "100%",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: "3px",
                    borderBottomRightRadius: "3px",
                  }}
                >
                  <OverlayTrigger
                    trigger="click"
                    key={"right"}
                    placement={"right"}
                    overlay={
                      <Popover id={`popover-positioned-${"right"}`}>
                        <Popover.Body>
                          3-digit security code usually found on the back of
                          your card. American Express cards have a 4-digit code
                          located on the front.
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <div>
                      <FaCircleQuestion
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        className="bi bi-info-circle-fill"
                      />
                    </div>
                  </OverlayTrigger>
                </InputGroup.Text>
              </div>
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                onChange={handleChange}
                type="text"
                name="nameOnCard"
                className={`form-control mx-1 ${
                  touched.email && errors.email ? "error" : null
                }`}
                id="name on card"
                aria-describedby="name on card"
                placeholder="Name on card"
                style={{ fontSize: "0.9rem", height: "47px" }}
              />
            </InputGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <ContextAwareToggle eventKey="1" setPaymentType={setPaymentType}>
              PayPal
            </ContextAwareToggle>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="21.21"
            viewBox="0 0 338.667 89.785"
          >
            <g transform="translate(936.898 -21.779)">
              <path
                clipPath="none"
                d="M-828.604 39.734c-.697 0-1.289.506-1.398 1.195l-8.068 51.165a1.31 1.31 0 0 0 1.294 1.513h9.568c.696 0 1.289-.507 1.398-1.195l2.37-15.025c.108-.688.701-1.195 1.398-1.195h8.699c10.164 0 18.792-7.416 20.368-17.465 1.589-10.134-6.328-18.971-17.549-18.993zm9.301 11.422h6.96c5.73 0 7.596 3.381 7.006 7.12-.59 3.747-3.488 6.507-9.031 6.507h-7.084zm45.788 3.478c-2.416.009-5.196.504-8.317 1.804-7.159 2.984-10.597 9.151-12.057 13.647 0 0-4.647 13.717 5.852 21.253 0 0 9.737 7.255 20.698-.447l-.189 1.203a1.31 1.31 0 0 0 1.292 1.513h9.083c.697 0 1.289-.507 1.398-1.195l5.525-35.038a1.31 1.31 0 0 0-1.292-1.515h-9.083c-.697 0-1.29.507-1.398 1.195l-.297 1.886s-3.967-4.333-11.216-4.306zm.297 11.067c1.043 0 1.997.144 2.853.419 3.919 1.258 6.141 5.023 5.498 9.104-.793 5.025-4.914 8.725-10.199 8.725-1.042 0-1.996-.143-2.853-.418-3.918-1.258-6.154-5.023-5.511-9.104.793-5.025 4.927-8.727 10.212-8.727z"
                fill="#003087"
              />
              <path
                clipPath="none"
                d="M-697.804 39.734c-.697 0-1.289.506-1.398 1.195l-8.068 51.165a1.31 1.31 0 0 0 1.294 1.513h9.568c.696 0 1.289-.507 1.398-1.195l2.37-15.025c.108-.688.701-1.195 1.398-1.195h8.699c10.164 0 18.791-7.416 20.366-17.465 1.59-10.134-6.326-18.971-17.547-18.993zm9.301 11.422h6.96c5.73 0 7.596 3.381 7.006 7.12-.59 3.747-3.487 6.507-9.031 6.507h-7.084zm45.787 3.478c-2.416.009-5.196.504-8.317 1.804-7.159 2.984-10.597 9.151-12.057 13.647 0 0-4.645 13.717 5.854 21.253 0 0 9.735 7.255 20.697-.447l-.189 1.203a1.31 1.31 0 0 0 1.294 1.513h9.082c.697 0 1.289-.507 1.398-1.195l5.527-35.038a1.31 1.31 0 0 0-1.294-1.515h-9.083c-.697 0-1.29.507-1.398 1.195l-.297 1.886s-3.967-4.333-11.216-4.306zm.297 11.067c1.043 0 1.997.144 2.853.419 3.919 1.258 6.141 5.023 5.498 9.104-.793 5.025-4.914 8.725-10.199 8.725-1.042 0-1.996-.143-2.853-.418-3.918-1.258-6.154-5.023-5.511-9.104.793-5.025 4.927-8.727 10.212-8.727z"
                fill="#0070e0"
              />
              <path
                clipPath="none"
                d="M-745.92 55.859c-.72 0-1.232.703-1.012 1.388l9.958 30.901-9.004 14.562c-.437.707.071 1.62.902 1.62h10.642a1.77 1.77 0 0 0 1.513-.854l27.811-46.007c.427-.707-.083-1.611-.909-1.611h-10.641a1.77 1.77 0 0 0-1.522.869l-10.947 18.482-5.557-18.345c-.181-.597-.732-1.006-1.355-1.006z"
                fill="#003087"
              />
              <path
                clipPath="none"
                d="M-609.107 39.734c-.696 0-1.289.507-1.398 1.195l-8.07 51.163a1.31 1.31 0 0 0 1.294 1.515h9.568c.696 0 1.289-.507 1.398-1.195l8.068-51.165a1.31 1.31 0 0 0-1.292-1.513z"
                fill="#0070e0"
              />
              <path
                clipPath="none"
                d="M-908.37 39.734a2.59 2.59 0 0 0-2.556 2.185l-4.247 26.936c.198-1.258 1.282-2.185 2.556-2.185h12.445c12.525 0 23.153-9.137 25.095-21.519a20.76 20.76 0 0 0 .245-2.793c-3.183-1.669-6.922-2.624-11.019-2.624z"
                fill="#001c64"
              />
              <path
                clipPath="none"
                d="M-874.832 42.359a20.76 20.76 0 0 1-.245 2.793c-1.942 12.382-12.571 21.519-25.095 21.519h-12.445c-1.273 0-2.358.926-2.556 2.185l-3.905 24.752-2.446 15.528a2.1 2.1 0 0 0 2.075 2.43h13.508a2.59 2.59 0 0 0 2.556-2.185l3.558-22.567a2.59 2.59 0 0 1 2.558-2.185h7.953c12.525 0 23.153-9.137 25.095-21.519 1.379-8.788-3.047-16.784-10.611-20.75z"
                fill="#0070e0"
              />
              <path
                clipPath="none"
                d="M-923.716 21.779c-1.273 0-2.358.926-2.556 2.183l-10.6 67.216c-.201 1.276.785 2.43 2.077 2.43h15.719l3.903-24.752 4.247-26.936a2.59 2.59 0 0 1 2.556-2.185h22.519c4.098 0 7.836.956 11.019 2.624.218-11.273-9.084-20.58-21.873-20.58z"
                fill="#003087"
              />
            </g>
          </svg>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <Card.Text style={{ fontSize: "0.9rem", fontWeight: 100 }}>
              After clicking &quot;Pay with PayPal&#34;, you will be redirected
              to PayPal to complete your purchase securely.
            </Card.Text>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

function ContextAwareToggle({
  children,
  eventKey,
  callback,
  setPaymentType,
}: any) {
  const { activeEventKey } = useContext(AccordionContext);

  const handleSelectPaymentType = useAccordionButton(eventKey, () => {
    callback && callback(eventKey);
    setPaymentType(children);
  });

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Fragment>
      <Form>
        <Form.Check type="radio" isValid>
          <Form.Check.Input
            type="radio"
            onClick={handleSelectPaymentType}
            checked={isCurrentEventKey ? true : false}
            style={{ cursor: "pointer" }}
            onChange={() => {}}
          />
          <Form.Check.Label
            onClick={handleSelectPaymentType}
            style={{
              cursor: "pointer",
              padding: "0 5px",
              fontWeight: 100,
              fontSize: "0.8rem",
              color: "#333",
            }}
          >
            {children}
          </Form.Check.Label>
        </Form.Check>
      </Form>
    </Fragment>
  );
}
