/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import "../styles/global.css";
import { CssBaseline } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../src/apollo";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
