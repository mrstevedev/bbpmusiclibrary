"use client";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { Nav } from "react-bootstrap";
import { CHECK_EMAIL, DATE_FORMAT } from "@/constants/index";
import { requestCloudfrontSignedUrl } from "@/services/Api";
import styles from "@/styles/Downloads.module.scss";
import DownloadButton from "@/components/Downloads/DownloadButton";

export default function DownloadRequestItem({ customer, downloads }) {
  const [message] = useState(CHECK_EMAIL);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState("");

  const { file_name, date } = downloads;
  const fileName = file_name.split("?")[0];

  const handleRequestCloudFrontSignedUrl = (
    customerId,
    orderId,
    productId,
    email,
    fileName
  ) => {
    return async () => {
      setToggle((prev) => !prev);
      try {
        const res = await requestCloudfrontSignedUrl(
          customerId,
          orderId,
          productId,
          email,
          fileName
        );
        console.log(res);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };
  };

  return (
    <Fragment>
      <Nav.Item>
        <h6 className={styles.BBP_Downloads__Label}>Filename</h6>
        <span className={styles.BBP_Downloads__Text}>{fileName}</span>
        <h6 className={styles.BBP_Downloads__Label}>Date of download</h6>
        <span className={styles.BBP_Downloads__Text}>
          {format(date, DATE_FORMAT)}
        </span>
        <h6 className={styles.BBP_Downloads__Label}>Request download</h6>
        <div className={styles.BBP_Downloads_Request_Button__Container}>
          <DownloadButton
            error={error}
            toggle={toggle}
            message={message}
            customer={customer}
            downloads={downloads}
            handleRequestCloudFrontSignedUrl={handleRequestCloudFrontSignedUrl}
          />
        </div>
      </Nav.Item>
    </Fragment>
  );
}
