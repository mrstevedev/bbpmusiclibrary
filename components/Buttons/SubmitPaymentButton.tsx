import { Button } from "react-bootstrap";

export default function SubmitPaymentButton() {
  return (
    <>
      <Button
        type="submit"
        form="my-form"
        className="btn btn-primary btn-block p-3"
      >
        <span style={{ fontSize: "0.9rem" }}>Continue to payment</span>
      </Button>
    </>
  );
}
