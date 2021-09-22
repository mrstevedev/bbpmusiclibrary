import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Footer from "../components/Footer";
import styles from "../styles/Confirm.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Confirm() {
  const router = useRouter()
  const email = router.query.email

  useEffect(() => {
    localStorage.removeItem('product')
  }, [])

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          document.body.classList.remove('Checkout__page'); 
          document.body.classList.add('Confirm__page')`,
        }}
      />
      <Head>
        <title>Bonita Basics Productions | About</title>
        <meta
          name="description"
          content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          className={styles.Confirm__success_payment}>
          <div className="container">
          <h2
            style={{
              color: "#4c4c4c",
              fontSize: "1.8rem",
              margin: "1rem 0",
              fontWeight: 100
            }}>
            <strong style={{ display: "flex" }}>Success!</strong> Your payment
            transaction was successful
          </h2>

          <p
            style={{
              fontWeight: 100,
            }}
          >
            A confirmation was sent to <strong>{ email }</strong> with the details of your
            payment in addition to a <strong>download link</strong> to your
            sample pack.
          </p>
          <p>
            <svg
              style={{ position: "relative", bottom: "2px" }}
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
      <Footer />
    </>
  );
}

export default Confirm