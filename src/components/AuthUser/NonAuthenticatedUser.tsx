import Link from "next/link";
import { Fragment } from "react";
import { Button } from "react-bootstrap";

export default function NonAuthenticatedUser() {
  return (
    <Fragment>
      <span className="nav-link" style={{ paddingLeft: 0 }}>
        Guest
      </span>
      <Link href="/login" style={{ display: "flex", paddingLeft: 0 }}>
        <Button
          color="white"
          style={{ borderRadius: "8px", padding: "0.3rem 1.1rem" }}
        >
          <span style={{ color: "white" }}>Sign-In</span>
        </Button>
      </Link>
    </Fragment>
  );
}
