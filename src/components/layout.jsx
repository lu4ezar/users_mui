import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import { Button, Container } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const siteTitle = "Users CRUD";

export default function Layout({ children, home }) {
  return (
    <Container maxWidth="md">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="NextJS GraphQL CRUD app" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>{children}</main>
      {!home && (
        <div>
          <div>{!home}</div>
          <Link href="/">
            <Button aria-label="back to home">
              <ArrowBackIcon />
              Back to home
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  home: PropTypes.bool,
};

Layout.defaultProps = {
  home: false,
};
