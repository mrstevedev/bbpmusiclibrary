import Head from "next/head"
import Layout from '../components/Layout'
import "../styles/globals.scss"

// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
     <Layout>
        <Component {...pageProps} />
     </Layout>
    </>
  );
}

export default MyApp;
