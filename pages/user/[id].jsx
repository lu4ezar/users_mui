import { useRouter } from "next/router";
import { Card, CardContent, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../../src/components/layout";
import { GET_USER } from "../../src/apolloClient";

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
            {name || <Skeleton width={200} />}
          </Typography>
          <Typography color="textSecondary">
            {email || <Skeleton width={350} />}
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
}
