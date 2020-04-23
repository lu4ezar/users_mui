import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../src/components/layout";
import Users from "../src/components/users";
import { getUsers } from "../lib/users";

export default function Home({ users }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <Users users={users} />
      </section>
    </Layout>
  );
}

Home.propTypes = {
  ...React.Children.propTypes,
};

export async function getServerSideProps() {
  const users = await getUsers();
  return {
    props: {
      users,
    },
  };
}
