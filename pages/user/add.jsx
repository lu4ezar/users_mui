import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../src/components/layout";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  input: {
    display: "none",
  },
}));

export default function AddUser() {
  const classes = useStyles();
  return (
    <Layout>
      <h1>Add new user</h1>
      <form className={classes.root} display="flex">
        <TextField label="name" />
        <TextField label="email" />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
}
