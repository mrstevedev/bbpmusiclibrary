"use client";
import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/navigation";

const GoPreviousNavigate = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <Fragment>
      <i className="bi bi-arrow-left-square" style={{ fontSize: "13px" }}></i>{" "}
      <Link
        href="/"
        className="link-blue"
        style={{ textTransform: "uppercase", fontSize: "0.7rem" }}
        onClick={handleGoBack}
      >
        Go back
      </Link>
    </Fragment>
  );
};

export default GoPreviousNavigate;
