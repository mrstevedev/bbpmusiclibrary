import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/router";

const GoPreviousNavigate = () => {
  const router = useRouter();
  return (
    <Fragment>
      <i
        className="bi bi-arrow-left-square"
        style={{
          fontSize: "0.8rem",
        }}
      ></i>{" "}
      <Link href="/">
        <a
          className="link-blue"
          style={{
            textTransform: "uppercase",
            fontSize: "0.7rem",
          }}
          onClick={() => router.back()}
        >
          Go back
        </a>
      </Link>
    </Fragment>
  );
};

export default GoPreviousNavigate;
