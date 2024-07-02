import Spinner from "@/components/Spinner/Spinner";
import { Button } from "react-bootstrap";

export default function SubmitPaymentStripeButton({ processing }) {
  return (
    <Button
      type="submit"
      className="btn btn-primary btn-block p-3"
      style={{
        height: "54px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {processing ? (
        <Spinner />
      ) : (
        <span style={{ fontSize: "1.1rem" }}>Pay now</span>
      )}
    </Button>
  );
}
