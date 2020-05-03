import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { Card, CardContent, Typography } from "@material-ui/core";
import Layout from "../../src/components/layout";
import { GET_USER } from "../../src/apolloClient";

/*
initial render results in failed graphql query:
https://nextjs.org/docs/routing/dynamic-routes#caveats
https://github.com/zeit/next.js/discussions/11484
*/

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const { name, email } =
    useQuery(GET_USER, {
      variables: { id },
    }).data?.user || {};

  return (
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
}
