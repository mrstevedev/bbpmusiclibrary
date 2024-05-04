import styles from "@/styles/OverlayNav.module.scss";
import Link from "next/link";

export default function OverlayNav({ handleToggleMenu }) {
  return (
    <>
      <div className={`${styles.Overlay__Nav} overlayNav`}>
        <ul
          className={`${styles.Overlay__Nav_list}  animated animatedFadeInUp fadeInUp`}
        >
          <li>
            <Link
              href="/about"
              className={styles.link}
              onClick={handleToggleMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link href="/" className={styles.link} onClick={handleToggleMenu}>
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/videos"
              className={styles.link}
              onClick={handleToggleMenu}
            >
              Music Videos
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={styles.link}
              onClick={handleToggleMenu}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
