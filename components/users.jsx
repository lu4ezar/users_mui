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
import useFetchUsers from "../hooks/useFetchUsers";

const useStyles = makeStyles({
  table: {
    minWidth: 0,
  },
});

const Users = () => {
  const users = useFetchUsers();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link href="user/add">
        <Fab aria-label="add user">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default Users;
