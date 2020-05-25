import {
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
  Paper,
} from "@material-ui/core";
import { AccountCircle, Email } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import Router from "next/router";
import Layout from "../../src/components/layout";
import { CREATE_USER, GET_USERS } from "../../src/apolloClient";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  wrapper: { position: "relative", marginLeft: "auto" },
  integratedProgress: {
    position: "absolute",
    top: "50%",
    left: " 50%",
    marginTop: -12,
    marginLeft: -12,
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
    update(cache, { data: { createUser: newUser } }) {
      const cachedQuery = cache.readQuery({
        query: GET_USERS,
      });
      const { users: cachedUsers } = cachedQuery.usersQuery;
      const users = [...cachedUsers, newUser];
      cache.writeQuery({
        query: GET_USERS,
        data: {
          usersQuery: {
            ...cachedQuery.usersQuery,
            users,
          },
        },
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
      <Typography color="textPrimary" variant="h3" gutterBottom>
        Add new user
      </Typography>
      <Paper>
        {error && (
          <Typography color="error">
            Error:
            {error.message}
          </Typography>
        )}
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            label="name"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <div className={classes.wrapper}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              disabled={!name || !email || loading}
            >
              Submit
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                className={classes.integratedProgress}
              />
            )}
          </div>
        </form>
      </Paper>
    </Layout>
  );
}
