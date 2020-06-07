import PropTypes from "prop-types";
import Link from "next/link";
import {
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Edit as EditIcon, Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
  },
  nameCell: {
    width: "40%",
  },
  emailCell: {
    width: "40%",
  },
  buttonsCell: {
    width: "20%",
  },
});

const UsersTableRow = ({ user, setEditId, handleDelete }) => {
  const classes = useStyles();
  const { _id: id, name, email } = user;
  return (
    <Link href="/user/[id]" as={`/user/${id}`}>
      <TableRow className={classes.row} hover>
        <TableCell scope="row" className={classes.nameCell}>
          {name || <Skeleton width={150} />}
        </TableCell>
        <TableCell align="right" className={classes.emailCell}>
          {email || <Skeleton width={300} />}
        </TableCell>
        <TableCell align="right" className={classes.buttonsCell}>
          <Tooltip title="edit user">
            <IconButton aria-label="edit" onClick={setEditId}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete user">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </Link>
  );
};

UsersTableRow.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  setEditId: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default UsersTableRow;
