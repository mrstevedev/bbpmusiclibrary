import React, { Fragment } from "react";

export default function ProductHeader({ length }) {
  return (
    <h1>
      Latest Releases
      <span>
        {" "}
        Showing <span data-testid="products-length">{length}</span>{" "}
      </span>
    </h1>
  );
}
