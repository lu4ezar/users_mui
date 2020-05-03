/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  CircularProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS, DELETE_USER, UPDATE_USER } from "../apolloClient";
import UsersTableRow from "./usersTableRow";
import UsersTableRowEdit from "./usersTableRowEdit";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  table: {
    minWidth: 600,
  },
  fab: {
    alignSelf: "flex-end",
    margin: "1rem",
  },
});

const Users = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_USERS);
  const { users } = data || {};

  const [editId, setEditId] = useState(null);

  const [deleteUser] = useMutation(DELETE_USER, {
    update(
      cache,
      {
        data: {
          deleteUser: { _id: deletedUserId },
        },
      }
    ) {
      const { users: cachedUsers } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: cachedUsers.filter(({ _id: id }) => id !== deletedUserId),
        },
      });
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser: updatedUser } }) {
      const { users: cachedUsers } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: cachedUsers.map((user) =>
            updatedUser._id === user._id ? updatedUser : user
          ),
        },
      });
    },
    onCompleted() {
      setEditId(null);
    },
  });

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteUser({
      variables: {
        id,
      },
    });
  };

  const handleSetEdit = (e, id) => {
    e.stopPropagation();
    setEditId(id);
  };

  return (
    <div className={classes.root}>
      <Typography color="textPrimary" variant="h3" gutterBottom>
        Users
      </Typography>
      {error && (
        <Typography color="error">
          Error:
          {error.message}
        </Typography>
      )}
      {loading && <CircularProgress />}
      {!users ? null : (
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            className={classes.table}
            size="small"
            aria-label="users table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                const userId = user._id;
                const isEditing = userId === editId;
                return isEditing ? (
                  <UsersTableRowEdit
                    key={userId}
                    user={user}
                    dropEditingId={() => setEditId(null)}
                    updateUser={updateUser}
                  />
                ) : (
                  <UsersTableRow
                    key={userId}
                    user={user}
                    setEditId={(e) => handleSetEdit(e, userId)}
                    handleDelete={(e) => handleDelete(e, userId)}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Link href="user/addUser">
        <Tooltip title="add user">
          <Fab className={classes.fab} aria-label="add user" color="primary">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Link>
    </div>
  );
};

export default Users;
