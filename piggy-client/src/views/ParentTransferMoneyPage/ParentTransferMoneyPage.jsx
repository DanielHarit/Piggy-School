import React, { useState, useEffect, useContext } from "react";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import ChildrenDisplay from "./ChildrenDisplay";
import axios from "axios";
import ParentContext from "../../ParentContext";
import config from "../../conf.json";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Dialog, DialogTitle } from "@mui/material";

import configData from "../../conf.json";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "30px",
    flexDirection: "column",
  },
  childrenContainer: {
    display: "flex",
    justifyContent: "center",
  },
  text: {
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: theme.spacing(2),
  },
}));

const ActionStatus = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  NONE: "none",
});

const ParentHomePage = () => {
  const [actionStatus, setActionStatus] = useState(ActionStatus.NONE);
  const { amount, setAmount, setSelectedChildrenId, selectedChildrenId } =
    useContext(ParentContext);

  const classes = useStyles();

  const [childrens, setChildrens] = useState([]);
  const [showText, setShowText] = useState("");

  useEffect(() => {
    amount && amount > 0
      ? setShowText(`בחרת להעביר ${amount} שקלים`)
      : setShowText("");
  }, [amount]);

  useEffect(async () => {
    const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const user = await axios.get(
      `${config.PIGGY_DB_URL}/parent/mail/${userMail}`
    );
    const childrens = await axios.get(
      `${config.PIGGY_DB_URL}/parentChild/${user.data._id}`
    );
    setChildrens(childrens.data);
    setSelectedChildrenId(childrens.data[0]._id);
  }, []);

  const handleTransferMoney = () => {
    console.log("payed for " + amount + " " + selectedChildrenId);

    axios
      .put(`${configData.PAYMENT_SERVICE_URL}/card/${selectedChildrenId}`, {
        amount: +amount,
      })
      .then((res) => {
        setActionStatus(ActionStatus.SUCCESS);
        setAmount(0);
      })
      .catch((err) => {
        setActionStatus(ActionStatus.ERROR);
        setAmount(0);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.childrenContainer}>
        {childrens.map((children) => (
          <ChildrenDisplay
            key={children._id}
            onClick={() => setSelectedChildrenId(children._id)}
            selected={selectedChildrenId === children._id}
            name={children.UserSettings?.DisplayName}
          />
        ))}
      </div>
      <TextField
        label="כמה תרצה להעביר?"
        variant="outlined"
        color="primary"
        fullWidth
        value={+amount || ""}
        type="number"
        onChange={(event) => setAmount(event.target.value)}
      />
      <Typography variant="h6" component="div" className={classes.text}>
        {showText}
      </Typography>

      <Dialog
        open={actionStatus === ActionStatus.SUCCESS}
        onClose={() => setActionStatus(ActionStatus.NONE)}
      >
        <DialogTitle id="alert-dialog-title">
          <CheckCircleOutlineIcon
            className={classes.icon}
            color="success"
            fontSize="large"
          />
          <Typography>ההעברה בוצעה בהצלחה!</Typography>
        </DialogTitle>
      </Dialog>
      <Dialog
        open={actionStatus === ActionStatus.ERROR}
        onClose={() => setActionStatus(ActionStatus.NONE)}
      >
        <DialogTitle id="alert-dialog-title">
          <ErrorOutlineIcon
            className={classes.icon}
            color="error"
            fontSize="large"
          />
          <Typography>ההעברה נכשלה</Typography>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default ParentHomePage;
