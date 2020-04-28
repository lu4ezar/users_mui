import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../src/components/layout";
import Users from "../src/components/users";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <Users />
      </section>
    </Layout>
  );
}

Home.propTypes = {
  ...React.Children.propTypes,
};
