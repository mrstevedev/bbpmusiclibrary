import Link from "next/link";
import styles from "@/styles/OverlayNav.module.scss";
import { useLocale } from "next-intl";

export default function OverlayNav({ handleToggleMenu }) {
  const locale = useLocale();
  return (
    <>
      <div className={`${styles.BBP_Overlay__Nav} overlayNav`}>
        <ul
          // animated animatedFadeInUp fadeInUp
          className={`${styles.BBP_Overlay__Nav_List}`}
        >
          <li>
            <Link
              href={`/${locale}/frequently-asked-questions`}
              className={styles.BBP__Link}
              onClick={handleToggleMenu}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/about`}
              className={styles.BBP__Link}
              onClick={handleToggleMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/contact`}
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
