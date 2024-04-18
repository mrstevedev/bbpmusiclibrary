// pages/404.js
import styles from "../styles/404.module.scss";

export default function Custom404() {
  return (
    <div className={`container ${styles.Error__404}`}>
      <h1 className={styles.Error__404__heading}>404</h1>
      <h2 className={styles.Error__404__Subheading}>Page Not Found</h2>
    </div>
  );
}
