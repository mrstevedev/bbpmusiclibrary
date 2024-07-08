"use client";
import Link from "next/link";
import { Button, Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { STATUS } from "@/constants/index";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { unsubscribe } from "@/services/Api";
export default function SubscribeButton() {
  const { auth } = useContext<TAuthContext>(AuthContext);
  const [subscription, setSubscription] = useState(false);

  const handleUnsubscribe = async () => {
    const email = auth.userEmail;
    const status = STATUS.STATUS_UNSUBSCRIBED;

    try {
      const response = await unsubscribe(email, status);

      if (response) setSubscription(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("Error");
      }
    }
  };

  return (
    <div>
      {!subscription ? (
        <Row className="mt-3">
          <Col>
            <Button onClick={handleUnsubscribe}>Unsubscribe</Button>
          </Col>
        </Row>
      ) : (
        <Row className="mt-3">
          <h6>
            You have unsubscribed successfully{" "}
            <Link className="link-blue" href="/">
              Go back
            </Link>{" "}
            to the homepage
          </h6>
        </Row>
      )}
    </div>
  );
}
