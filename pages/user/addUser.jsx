import { TextField, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import Router from "next/router";
import Layout from "../../src/components/layout";
import { CREATE_USER, GET_USERS } from "../../src/apolloClient";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    variables: {
      name,
      email,
    },
    update(cache, { data: { createUser: createUserResult } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.concat([createUserResult]) },
      });
    },
    onCompleted: () => {
      Router.push("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <Layout>
      <h1>Add new user</h1>
      {error && (
        <div>
          Error!
          {error.message}
        </div>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <form className={classes.root} display="flex" onSubmit={handleSubmit}>
          <TextField
            label="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="email"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button color="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      )}
    </Layout>
  );
}
