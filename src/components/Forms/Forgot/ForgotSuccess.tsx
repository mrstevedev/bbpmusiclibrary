import Link from "next/link";
import { Fragment } from "react";
import styles from "@/styles/ForgotPassword.module.scss";

export default function ForgotSuccess() {
  return (
    <Fragment>
      <h5>Password has been reset</h5>
      <p className={styles.BBP_Forgot_Password_Success__Text}>
        Your password has been reset successfully.
      </p>
      <p className={styles.BBP_Forgot_Password_Success__Text}>
        Click{" "}
        <Link href="/login" className="link-blue">
          here
        </Link>{" "}
        to sign in.
      </p>
    </Fragment>
  );
}
