import Link from "next/link";
import Script from "next/script";
import styles from "../styles/Confirm.module.scss";
import { useContext, useEffect } from "react";
import { AppContext } from "../components/context/AppContext";
import { useRouter } from 'next/router';

function Confirm() {
  const router = useRouter();
  const email = router.query.email;
  const [cart, setCart] = useContext(AppContext);

  useEffect(() => {
    localStorage.removeItem('product')
    setCart(null)
  }, [setCart])

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          document.body.classList.remove('Checkout__page'); 
          document.body.classList.add('Confirm__page')`,
        }}
      />
      <main>
        <div
          className={styles.Confirm__success_payment}>
          <div className="container">
          <h2 className={ styles.Confirm__heading }>
            <strong className={ styles.Confirm__headingSuccess }>Success!</strong> Your payment
            transaction was successful
          </h2>

          <p className={styles.Confirm__text}>
            A confirmation was sent to <strong>{ email }</strong> with the details of your
            payment in addition to a <strong>download link</strong> to your
            sample pack.
          </p>
          <p>
            <svg
              className={styles.Confirm__success__icon}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
            <Link href="/">
              <a className="link">Back to home</a>
            </Link>
          </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Confirm