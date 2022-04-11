import { Switch, Typography, Input, FormControl } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import makeStyles from "@mui/styles/makeStyles";
import SettingBox from "./SettingBox";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../assets/img/4043250_avatar_child_girl_kid_icon.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import routes from "../../components/Router/Routes";
import { Navigate, useLocation } from "react-router-dom";

import config from "../../conf.json";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
  },
  container: {
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
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: "1px",
  },
  color: {
    width: "70px",
    backgroundColor: theme.palette.background.default,
    border: "1px solid black",
    borderRadius: "10px",
  },
  colorText: {
    paddingLeft: "26px",
    textAlign: "center",
    margin: "auto 0",
  },
  colorContainer: {
    height: "6.5vh",
  },
  alert: {
    flexBasis: "100%",
  },
  alertContainer: {
    flexWrap: "wrap",
  },
  emailContainer: {
    display: "flex",
    "& :first-child": {
      paddingLeft: "10px",
    },
  },
}));
// : {WeeklyWatch,NewStories,Allowance}})
const ChildrenSettings = ({ onUserNameChange }) => {
  const {
    state: { settings, mail },
  } = useLocation();

  const classes = useStyles();
  const AdornmentRef = useRef();
  const [alertSettings, setAlertSettings] = useState({
    WeeklyWatch: false,
    NewStories: false,
    Allowance: false,
  });
  const [userDetailsSettings, setUserDetailsSettings] = useState({
    DisplayName: "",
    Mail: "",
  });
  const [editName, setEditName] = useState(null);
  const navigate = useNavigate();

  const handleChangeSettings = (prop) => {
    axios
      .put(
        `${config.PIGGY_DB_URL}/children/AlertSettings/62171cef74e8cac9530dcaac`,
        {
          [prop]: !alertSettings[prop],
        }
      )
      .then((data) =>
        setAlertSettings((prev) => ({ ...prev, [prop]: !prev[prop] }))
      );
  };

  const handleChangeDisplayName = (displayName) => {
    axios
      .put(
        `${config.PIGGY_DB_URL}/children/DisplayName/62171cef74e8cac9530dcaac`,
        {
          value: displayName,
        }
      )
      .then((data) => {
        setUserDetailsSettings((prev) => ({
          ...prev,
          DisplayName: displayName,
        }));
        onUserNameChange(displayName);
      });
  };

  useEffect(() => {
    setUserDetailsSettings((prev) => ({
      ...prev,
      mail,
    }));
  }, [mail]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setEditName(value);
  };

  useEffect(() => {
    if (settings) {
      setAlertSettings(settings.AlertsSettings);
      setUserDetailsSettings((prev) => ({
        ...prev,
        DisplayName: settings.DisplayName,
      }));
    }
  }, [settings]);

  return (
    <div className={classes.container}>
      <SettingBox title="פרטים אישיים">
        <>
          <div className={classes.imgContainer}>
            <img alt="logo" src={avatarImg} className={classes.img}></img>
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
                  <FormControl
                    variant="standard"
                  >
                    <Input
                 
                     onBlur={(event) => {
                       if(event.relatedTarget === AdornmentRef.current)
                          handleChangeDisplayName(editName)
                      setEditName(null);
                    }}
                      autoFocus
                      value={editName}
                      variant="standard"
                      onChange={handleInputChange}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          style={{ pointerEvents: "stroke" }}
                          disablePointerEvents
                          onClick={(event) =>{
                            console.log('click input')
                            handleChangeDisplayName(editName, event)}
                          }
                        >
                          <IconButton
                            aria-label="send"
                            ref={AdornmentRef}
                            edge="end"
                          >
                            <DoneIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
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
              {/* <IconButton
                color="primary"
                aria-label="edit email"
              > */}
            </div>

            {/* </IconButton> */}
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
