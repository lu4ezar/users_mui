import PropTypes from "prop-types";
import {
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Done as DoneIcon, Cancel as CancelIcon } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
  },
});

const UsersTableRow = ({ user, dropEditingId, updateUser }) => {
  const classes = useStyles();
  const { _id: id } = user;
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const handleSubmit = () =>
    updateUser({
      variables: {
        id,
        input: {
          name,
          email,
        },
      },
    });
  return (
    <TableRow className={classes.row} hover>
      <TableCell scope="row">
        <TextField value={name} onChange={(e) => setName(e.target.value)} />
      </TableCell>
      <TableCell align="right">
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="save changes">
          <IconButton
            type="submit"
            aria-label="save changes"
            onClick={handleSubmit}
          >
            <DoneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="cancel edit">
          <IconButton aria-label="cancel edit" onClick={dropEditingId}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

UsersTableRow.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  dropEditingId: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default UsersTableRow;
