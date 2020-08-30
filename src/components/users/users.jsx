import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  Tooltip,
  Typography,
  Button,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import UsersTableRow from "../usersTableRow";
import UsersTableRowEdit from "../usersTableRowEdit";
import useStyles from "./useStyles";
import { useUpdateMutation, useDeleteMutation, useFetch } from "./usersHooks";
import PAGE_SIZE from "../../apolloClient/PAGE_SIZE";

// dummy object for initial loading state
const createDummyUsersList = () =>
  new Array(PAGE_SIZE)
    .fill({ name: "", email: "" })
    .map((user) => ({ ...user, _id: Math.random().toString() }));

const Users = () => {
  const classes = useStyles();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { deleteUser, error: deleteError } = useDeleteMutation();
  const { updateUser, error: updateError } = useUpdateMutation();
  const {
    fetchMore,
    data: {
      usersQuery: { users = createDummyUsersList(), hasNext = false } = {},
    } = {},
    loading,
    error,
  } = useFetch();
  const [editId, setEditId] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (error || deleteError || updateError) {
      const { message } = error || deleteError || updateError;
      setErrorMessage(message);
    }
  }, [error, updateError, deleteError]);

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

  const handleCloseErrorMessage = () => {
    setErrorMessage(null);
  };

  const handleMoreClick = () =>
    fetchMore().catch((err) => {
      setErrorMessage(err.message);
    });

  if (!hasMounted) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography color="textPrimary" variant="h3" gutterBottom>
        Users
      </Typography>
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={5000}
          onClose={handleCloseErrorMessage}
        >
          <Alert onClose={handleCloseErrorMessage} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      <TableContainer component="form">
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
              const { _id: userId, name, email } = user;
              const isEditing = userId === editId;
              if (!loading && !name && !email) {
                return null;
              }
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
                  isLoading={loading}
                  setEditId={(e) => handleSetEdit(e, userId)}
                  handleDelete={(e) => handleDelete(e, userId)}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <LinearProgress />}
      <div className={classes.btn__container}>
        <Button
          variant="contained"
          disabled={!hasNext}
          onClick={handleMoreClick}
        >
          More
        </Button>
        <Link href="user/addUser">
          <Tooltip title="add user">
            <Fab aria-label="add user" color="primary">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default Users;
