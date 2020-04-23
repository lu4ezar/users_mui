import PropTypes from "prop-types";
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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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

const Users = ({ users }) => {
  const classes = useStyles();
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
              {users.map((user) => (
                <Link key={user.id} href="/user/[id" as={`/user/${user.id}`}>
                  <TableRow className={classes.row} hover>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                  </TableRow>
                </Link>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Link href="user/add">
        <Fab className={classes.fab} aria-label="add user">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

Users.defaultProps = {
  users: [],
};

export default Users;
