import React from "react";
import Layout from "../src/components/layout";
import Users from "../src/components/users";

export default function Home() {
  return (
    <Layout home>
      <section>
        <Users />
      </section>
    </Layout>
  );
}

Home.propTypes = {
  ...React.Children.propTypes,
};
