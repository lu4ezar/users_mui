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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../apollo";

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
  const { loading, error, data } = useQuery(GET_USERS);
  const { users } = data || {};
  const classes = useStyles();
  if (loading) return <CircularProgress />;
  if (error)
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  return (
    <div className={classes.root}>
      <h1>Users</h1>
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
