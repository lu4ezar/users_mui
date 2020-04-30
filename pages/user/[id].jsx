import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { Card, CardContent, Typography } from "@material-ui/core";
import Layout from "../../src/components/layout";
import { GET_USER } from "../../src/apolloClient";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const { name, email } =
    useQuery(GET_USER, {
      variables: { id },
    })?.data?.user || {};

  return (
    <Layout>
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
