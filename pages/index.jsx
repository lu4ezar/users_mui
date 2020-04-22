import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Users from "../components/users";

export default function Home({ users }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Users users={users} />
      </section>
    </Layout>
  );
}

Home.propTypes = {
  ...React.Children.propTypes,
};

const url =
  "https://gist.githubusercontent.com/lu4ezar/fedc080ab29a9211ee1df3e6ac4e3235/raw/53ad3f5d9106b9d60270d0d64ae5b8eb27e51c94/users";

export async function getServerSideProps() {
  const res = await fetch(url);
  const { users } = await res.json();
  return {
    props: {
      users,
    },
  };
}
