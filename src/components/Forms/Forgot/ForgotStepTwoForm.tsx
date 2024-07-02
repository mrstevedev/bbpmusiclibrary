import Link from "next/link";
import { Fragment } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import styles from "@/styles/ForgotPassword.module.scss";
import Spinner from "@/components/Spinner/Spinner";
import EyeTogglePasswordIcon from "@/components/Icons/EyeTogglePasswordIcon";

export default function ForgotStepTwoForm({
  isLoading,
  handleChange,
  handleSetNewPassword,
  setFormSubmit,
}) {
  return (
    <Fragment>
      <h5>Check your email</h5>
      <p style={{ fontWeight: 100 }}>
        A 4-digit code has been sent to your email
      </p>
      <Form method="post" onSubmit={handleSetNewPassword}>
        <div className="mb-2 input-group">
          <FormControl
            required
            autoFocus
            id="code"
            type="text"
            name="code"
            onChange={handleChange}
            aria-describedby="code"
            className="forgot-input"
            placeholder="Enter 4-digit code"
          />
          <FormControl
            required
            id="email"
            type="text"
            name="email"
            aria-describedby="email"
            placeholder="Enter email address"
            className="forgot-input"
            onChange={handleChange}
          />
        </div>
        <div style={{ position: "relative" }}>
          <EyeTogglePasswordIcon left={null} right={"1rem"} />
          <div className="mb-2 input-group">
            <FormControl
              required
              type="password"
              id="password"
              name="password"
              aria-describedby="password"
              placeholder="Enter new password"
              className="forgot-input"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <Button
              type="submit"
              className={`btn btn-primary btn-block ${styles.BBP_Forgot_Password_Reset__Button}`}
            >
              Reset
              {isLoading && (
                <span className={styles.BBP_Button_Loading__Spinner}>
                  <Spinner />
                </span>
              )}
            </Button>
          </div>
          <div className="mt-3">
            <hr />
            <h2 className={styles.BBP_Forgot_Password__Sign_In}>
              Back to request code{" "}
              <Link href="#" onClick={(e) => setFormSubmit(false)}>
                here
              </Link>
            </h2>
          </div>
        </div>
      </Form>
    </Fragment>
  );
}
