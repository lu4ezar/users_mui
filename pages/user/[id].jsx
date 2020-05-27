import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@material-ui/core";
import Layout from "../../src/components/layout";
import client from "../../src/apolloClient";
import { GET_USER } from "../../src/apolloClient/queries";

const User = ({ name, email }) => (
  <Layout>
    <Typography color="textPrimary" variant="h3" gutterBottom>
      User Info
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography color="textSecondary">{email}</Typography>
      </CardContent>
    </Card>
  </Layout>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default User;

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const {
    data: {
      user: { name, email },
    },
  } = await client.query({
    query: GET_USER,
    variables: { id },
  });
  return {
    props: { name, email },
  };
}
