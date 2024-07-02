// pages/404.js
import styles from "@/styles/NotFound.module.scss";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className={`container ${styles.BBP_Error__404}`}>
      <h1 className={styles.BBP_Error_404__Heading}>404</h1>
      <h2 className={styles.BBP_Error_404__Subheading}>Page Not Found</h2>
      <p>
        The page you tried to access does not exist on our server. Go back to
        the{" "}
        <Link href="/" className="link-blue" style={{ fontWeight: 400 }}>
          homepage
        </Link>
      </p>
    </div>
  );
}
