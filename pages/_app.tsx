import Layout from "../components/Layout";
import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";

import { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import client from "../client/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
