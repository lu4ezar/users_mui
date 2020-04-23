import PropTypes from "prop-types";
import Layout from "../../src/components/layout";
import { getAllUserIds, getUser } from "../lib/users";

export default function User({ userData }) {
  const { name, email } = userData;
  return (
    <Layout>
      <div>{name}</div>
      <div>{email}</div>
    </Layout>
  );
}

User.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export async function getStaticPaths() {
  const paths = await getAllUserIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const userData = await getUser(params.id);
  return {
    props: {
      userData,
    },
  };
}
