/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import "../styles/global.css";
import { CssBaseline, LinearProgress } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";
import Router from "next/router";
import { useState } from "react";
import client from "../src/apolloClient";

export default function App({ Component, pageProps }) {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  Router.events.on("routeChangeStart", () => {
    setIsLoadingPage(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setIsLoadingPage(false);
  });
  Router.events.on("routeChangeError", () => {
    setIsLoadingPage(false);
  });
  return (
    <ApolloProvider client={client}>
      <LinearProgress
        style={{ visibility: !isLoadingPage ? "hidden" : "visible" }}
      />
      <CssBaseline />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
