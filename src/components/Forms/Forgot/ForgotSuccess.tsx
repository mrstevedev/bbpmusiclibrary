import Link from "next/link";
import { Fragment } from "react";

export default function ForgotSuccess() {
  return (
    <Fragment>
      <h5>Password has been reset</h5>
      <p style={{ fontWeight: 100 }}>
        Your password has been reset successfully. Click{" "}
        <Link href="/login">here</Link> to sign in.
      </p>
    </Fragment>
  );
}
