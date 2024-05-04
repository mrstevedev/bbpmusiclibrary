import Link from "next/link";
import { Fragment } from "react";

export default function NonAuthenticatedUser() {
  return (
    <Fragment>
      <span className="nav-link" style={{ paddingLeft: "0" }}>
        Guest
      </span>
      <Link href="/login" className="nav-link" style={{ paddingLeft: 0 }}>
        <span style={{ color: "#5782bf" }}>Sign-In</span>
      </Link>
    </Fragment>
  );
}
