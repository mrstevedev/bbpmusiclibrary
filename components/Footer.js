import styles from '../styles/Footer.module.scss'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={`container ${styles.container}`}>
          <div className="col-md-3">
            <Link href="https://www.discogs.com/my">
              <a>
              <svg
                className={styles.link}
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
              >
                <path
                  id="iconmonstr-instagram-11"
                  d="M12,2.163c3.2,0,3.584.012,4.85.07,3.252.148,4.771,1.691,4.919,4.919.058,1.265.069,1.645.069,4.849s-.012,3.584-.069,4.849c-.149,3.225-1.664,4.771-4.919,4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.7-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.013-3.583.07-4.849C2.381,3.924,3.9,2.38,7.151,2.232,8.417,2.175,8.8,2.163,12,2.163ZM12,0C8.741,0,8.333.014,7.053.072,2.7.272.273,2.69.073,7.052.014,8.333,0,8.741,0,12s.014,3.668.072,4.948c.2,4.358,2.618,6.78,6.98,6.98C8.333,23.986,8.741,24,12,24s3.668-.014,4.948-.072c4.354-.2,6.782-2.618,6.979-6.98C23.986,15.668,24,15.259,24,12s-.014-3.667-.072-4.947c-.2-4.354-2.617-6.78-6.979-6.98C15.668.014,15.259,0,12,0Zm0,5.838A6.163,6.163,0,1,0,18.162,12,6.162,6.162,0,0,0,12,5.838ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.406,4.155a1.44,1.44,0,1,0,1.439,1.44A1.441,1.441,0,0,0,18.406,4.155Z"
                  fill="#fff"
                />
              </svg>
              </a>
            </Link>
          </div>
          <div className="col d-flex justify-content-end">
            <p>&copy; 2021 BBPSampleLibrary | Built by <a className={ styles.built_by } href="https://mrstevedev.io/" target="_blank" rel="noreferrer">sp</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
