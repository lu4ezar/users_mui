import PropTypes from "prop-types";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  table: {
    minWidth: 600,
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
                <TableRow hover key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                </TableRow>
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
