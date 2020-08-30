import { useRouter } from "next/router";
import { Card, CardContent, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../../src/components/layout";
import { GET_USER } from "../../src/apolloClient/queries";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const { data: { user: { name, email } = {} } = {}, loading } = useQuery(
    GET_USER,
    {
      variables: { id },
    }
  );
  return (
    <Layout>
      <Typography color="textPrimary" variant="h3" gutterBottom>
        User Info
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {loading ? <Skeleton width={200} /> : name}
          </Typography>
          <Typography color="textSecondary">
            {loading ? <Skeleton width={350} /> : email}
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
}
