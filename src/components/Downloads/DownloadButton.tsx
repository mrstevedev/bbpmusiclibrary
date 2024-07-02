import { Fragment } from "react";
import { Button } from "react-bootstrap";
import styles from "@/styles/Downloads.module.scss";

export default function DownloadButton({
  error,
  toggle,
  message,
  customer,
  downloads,
  handleRequestCloudFrontSignedUrl,
}) {
  const { databaseId, email } = customer;
  const { file_name, order_id, product_id } = downloads;

  return (
    <Fragment>
      <Button
        size="sm"
        onClick={handleRequestCloudFrontSignedUrl(
          databaseId,
          order_id,
          product_id,
          email,
          file_name
        )}
        disabled={toggle ?? true}
      >
        {!toggle ? "Request Link" : "Request sent"}
      </Button>

      <p className={styles.BBP_Downloads_Request__Text}>
        {toggle && !error ? message : null}
        {toggle && error ? <span style={{ color: "red" }}>{error}</span> : null}
      </p>
    </Fragment>
  );
}
