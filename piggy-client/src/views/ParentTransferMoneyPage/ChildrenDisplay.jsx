import React from "react";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import { Avatar, IconButton } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";

import axios from "axios";
import configData from "../../conf.json";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "30px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "100px",
    justifyContent: "center",
  },
  childrenDisplay: {
    borderRadius: "50%",
    height: "60px",
    width: "60px",
  },
  selected: {
    border: "1px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.primary.main,
    textAlign: "center",
  },
}));

const ChildrenDisplay = ({ name, onClick, selected,avatarId }) => {
  const classes = useStyles();
  const [avatarUrl, setAvatarUrl] = useState({});

  useEffect(() => {
    axios
      .get(`${configData.PIGGY_DB_URL}/avatar/${avatarId}`)
      .then((res) => {
        setAvatarUrl(res.data.URL);
      });
  }, []);

  return (
    <div className={classes.container}>
     
      <IconButton onClick={onClick}>
        <Avatar 
          className={clsx({
            [classes.childrenDisplay]: true,
            [classes.selected]: selected,
          })}
          alt="Remy Sharp" src={`${avatarUrl}`} />
        {/* <Paper 
          elevation={3}
          className={clsx({
            [classes.childrenDisplay]: true,
            [classes.selected]: selected,
          })}
        ></Paper> */}
      </IconButton>

      <Typography variant="h6" component="div" className={classes.text}>
        {name} 
      </Typography>

    </div>
  );
};

export default ChildrenDisplay;
