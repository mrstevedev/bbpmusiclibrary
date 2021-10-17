import styles from "../styles/OverlayNav.module.scss";
import Link from "next/link";

export default function OverlayNav(props) {
  return (
    <>
      <div className={styles.Overlay__Nav}>
        <ul className={`${styles.Overlay__Nav_list}  animated animatedFadeInUp fadeInUp`}>
        <li>
            <Link href="/about">
              <a className={styles.link} onClick={props.handleToggleMenu}>About</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className={styles.link} onClick={props.handleToggleMenu}>Products</a>
            </Link>
          </li>
          <li>
            <Link href="/videos">
              <a className={styles.link} onClick={props.handleToggleMenu}>Music Videos</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className={styles.link} onClick={props.handleToggleMenu}>Contact Me</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
