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
  CircularProgress,
  Tooltip,
  Typography,
  Button,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import UsersTableRow from "../usersTableRow";
import UsersTableRowEdit from "../usersTableRowEdit";
import useStyles from "./useStyles";
import { useUpdateMutation, useDeleteMutation, useFetch } from "./usersHooks";

const Users = () => {
  const classes = useStyles();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const deleteUser = useDeleteMutation();
  const updateUser = useUpdateMutation();
  const {
    fetchMore,
    data: { usersQuery: { users = [], hasNext = true } = {} } = {},
    loading,
    error,
  } = useFetch();
  const [editId, setEditId] = useState(null);

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

  if (!hasMounted) {
    return null;
  }

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
      <div className={classes.btn__container}>
        <Button variant="contained" disabled={!hasNext} onClick={fetchMore}>
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
