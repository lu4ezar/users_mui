import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  table: {
    minWidth: 600,
  },
  btn__container: {
    display: `flex`,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "1em 0",
    "& > button": {
      margin: "0 1em",
    },
  },
});

export default useStyles;
