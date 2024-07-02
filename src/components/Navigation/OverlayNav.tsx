import styles from "@/styles/OverlayNav.module.scss";
import Link from "next/link";

export default function OverlayNav({ handleToggleMenu }) {
  return (
    <>
      <div className={`${styles.BBP_Overlay__Nav} overlayNav`}>
        <ul
          // animated animatedFadeInUp fadeInUp
          className={`${styles.BBP_Overlay__Nav_List}`}
        >
          <li>
            <Link
              href="/frequently-asked-questions"
              className={styles.BBP__Link}
              onClick={handleToggleMenu}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={styles.BBP__Link}
              onClick={handleToggleMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={styles.BBP__Link}
              onClick={handleToggleMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
