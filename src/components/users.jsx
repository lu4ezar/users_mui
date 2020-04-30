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
  IconButton,
} from "@material-ui/core";
import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS, DELETE_USER } from "../apolloClient";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  table: {
    minWidth: 600,
  },
  row: {
    cursor: "pointer",
  },
  fab: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

const Users = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_USERS);
  const { users } = data || {};
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

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteUser({
      variables: {
        id,
      },
    });
  };

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <h1>Users</h1>
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
              {users.map(({ _id: id, name, email }) => (
                <Link key={id} href="/user/[id]" as={`/user/${id}`}>
                  <TableRow className={classes.row} hover>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">{email}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => handleDelete(e, id)}
                        title="delete user"
                      >
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Link href="user/addUser">
        <Fab className={classes.fab} aria-label="add user">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default Users;
