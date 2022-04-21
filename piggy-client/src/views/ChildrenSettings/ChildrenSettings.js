import {
  Switch,
  Typography,
  Input,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React, { useState, useEffect, useRef } from "react";
import makeStyles from "@mui/styles/makeStyles";
import SettingBox from "../../components/Commons/SettingBox";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import routes from "../../components/Router/Routes";
import { useLocation } from "react-router-dom";

import config from "../../conf.json";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
  },
  container: {
    display: "flex",
    height: "100%",
    overflowY: "auto",
    flexDirection: "column",
    margin: "0 5%",
    "& > *": {
      marginTop: "2vh",
    },
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "60%",
    justifyContent: "center",
    paddingRight: "6px",
  },
  imgContainer: {
    display: "flex",
    flexBasis: "20%",
    position: "relative",
  },
  editImg: {
    paddingRight: "1px",
    marginRight: "71%",
    marginTop: "63%",
    position: "absolute",
  },
  img: {
    display: "block",
    height: "20vmin",
    width: "20vmin",
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: "1px",
  },
  color: {
    width: "70px",
    backgroundColor: theme.palette.background.default,
    border: "1px solid black",
    borderRadius: "10px",
    maxHeight: "70px",
    height: "100%",
  },
  colorText: {
    paddingLeft: "26px",
    textAlign: "center",
    margin: "auto 0",
  },
  colorContainer: {
    height: "6.5vh",
    alignItems: "center",
  },
  alert: {
    flexBasis: "100%",
  },
  alertContainer: {
    flexWrap: "wrap",
    alignContent: "space-evenly",
  },
  emailContainer: {
    display: "flex",
    "& :first-child": {
      paddingLeft: "10px",
    },
  },
}));
const ChildrenSettings = ({ onUserNameChange }) => {
  const {
    state: { settings, mail },
  } = useLocation();

  const classes = useStyles();
  const [alertSettings, setAlertSettings] = useState({
    WeeklyWatch: false,
    NewStories: false,
    Allowance: false,
  });
  const [userDetailsSettings, setUserDetailsSettings] = useState({
    DisplayName: "",
    mail: "",
    avatarURL: "",
  });
  const [editName, setEditName] = useState(null);
  const navigate = useNavigate();

  const handleChangeSettings = async (prop) => {
    const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const user = await axios.get(
      `${config.PIGGY_DB_URL}/children/mail/${userMail}`
    );
    axios
      .put(`${config.PIGGY_DB_URL}/children/AlertSettings/${user.data._id}`, {
        [prop]: !alertSettings[prop],
      })
      .then((data) =>
        setAlertSettings((prev) => ({ ...prev, [prop]: !prev[prop] }))
      );
  };

  const handleChangeDisplayName = async (displayName) => {
    const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const user = await axios.get(
      `${config.PIGGY_DB_URL}/children/mail/${userMail}`
    );
    axios
      .put(`${config.PIGGY_DB_URL}/children/DisplayName/${user.data._id}`, {
        value: displayName,
      })
      .then((data) => {
        setUserDetailsSettings((prev) => ({
          ...prev,
          DisplayName: displayName,
        }));
        onUserNameChange(displayName);
        setEditName(null);
      });
  };

  useEffect(() => {
    setUserDetailsSettings((prev) => ({
      ...prev,
      mail: JSON.parse(sessionStorage.getItem("profileObj"))["email"],
    }));
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setEditName(value);
  };

  useEffect(() => {
    if (settings) {
      setAlertSettings(settings.AlertsSettings);
      setUserDetailsSettings((prev) => ({
        ...prev,
        ...settings,
      }));
    }
  }, [settings]);

  useEffect(() => {
    axios
      .get(`${config.PIGGY_DB_URL}/avatar/${settings.AvatarId}`)
      .then((res) =>
        setUserDetailsSettings((prev) => ({ ...prev, avatarURL: res.data.URL }))
      );
  }, [settings]);

  return (
    <div className={classes.container}>
      <SettingBox title="פרטים אישיים">
        <>
          <div className={classes.imgContainer}>
            {userDetailsSettings.avatarURL ? (
              <img
                alt="logo"
                src={userDetailsSettings.avatarURL}
                className={classes.img}
              ></img>
            ) : (
              <Skeleton
                variant="circular"
                className={classes.skelaton}
                width="20vmin"
                height="20vmin"
              />
            )}
            <EditIcon
              className={classes.editImg}
              fontSize="small"
              onClick={() => navigate(routes.Store)}
            />
          </div>
          <div className={classes.userDetails}>
            <div className={classes.emailContainer}>
              {editName ? (
                <>
                  <FormControl variant="standard">
                    <Input
                      autoFocus
                      value={editName}
                      variant="standard"
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <IconButton
                    aria-label="send"
                    edge="end"
                    onClick={() => handleChangeDisplayName(editName)}
                  >
                    <DoneIcon />
                  </IconButton>
                  <IconButton
                    aria-label="send"
                    onClick={() => setEditName(null)}
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography>{userDetailsSettings.DisplayName}</Typography>
                  <EditIcon
                    onClick={() => {
                      setEditName(userDetailsSettings.DisplayName);
                    }}
                  />
                </>
              )}
            </div>
            <Typography>{userDetailsSettings.mail}</Typography>
          </div>
        </>
      </SettingBox>
      <SettingBox className={classes.colorContainer}>
        <Typography className={classes.colorText}>אני רוצה רקע בצבע</Typography>
        <div
          className={classes.color}
          onClick={() => {
            navigate(routes.Store);
          }}
        ></div>
      </SettingBox>
      <SettingBox title="התראות" className={classes.alertContainer}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={alertSettings.WeeklyWatch}
                onChange={() => handleChangeSettings("WeeklyWatch")}
              />
            }
            label="תזכורת לצפייה שבועית"
          />
          <FormControlLabel
            control={
              <Switch
                checked={alertSettings.NewStories}
                onChange={() => handleChangeSettings("NewStories")}
              />
            }
            label="stories חדשים"
          />
          <FormControlLabel
            control={
              <Switch
                checked={alertSettings.Allowance}
                onChange={() => handleChangeSettings("Allowance")}
              />
            }
            label="קבלת דמי כיס"
          />
        </FormGroup>
      </SettingBox>
    </div>
  );
};

export default ChildrenSettings;
