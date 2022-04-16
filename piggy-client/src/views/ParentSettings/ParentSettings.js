import { Switch, Typography, Input, FormControl } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import makeStyles from "@mui/styles/makeStyles";
import SettingBox from "../../components/Commons/SettingBox";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from "@mui/icons-material/Edit";
import routes from "../../components/Router/Routes";
import { Navigate, useLocation } from "react-router-dom";
import ChildrenDisplay from "../ParentTransferMoneyPage/ChildrenDisplay";
import Button from "@mui/material/Button";
import config from "../../conf.json";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
  },
  childrenContainer: {
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
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
    flexGrow: "1",
    "& > *": {
      marginTop: "0.3vh",
    },
    justifyContent: "center",
    paddingRight: "6px",
  },
  btn: {
    width: "60%",
    alignSelf: "center",
  },
  editImg: {
    paddingRight: "1px",
    marginRight: "71%",
    marginTop: "63%",
    position: "absolute",
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
const ParentSettings = ({ onUserNameChange }) => {
  const {
    state: { settings, mail },
  } = useLocation();

  const classes = useStyles();
  const [alertSettings, setAlertSettings] = useState({
    newExpense: false,
    newAim: false,
    ReceivedMonyLimit: false,
  });
  const [userDetailsSettings, setUserDetailsSettings] = useState({
    DisplayName: "",
    Mail: "",
  });
  const [editName, setEditName] = useState(null);
  const [childrens, setChildrens] = useState([]);
  const navigate = useNavigate();

  const handleChangeSettings = (prop) => {
    axios
      .put(
        `${config.PIGGY_DB_URL}/parent/AlertSettings/62171cef74e8cac9530dcdsdacbw`,
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
        `${config.PIGGY_DB_URL}/parent/DisplayName/62171cef74e8cac9530dcdsdacbw`,
        {
          value: displayName,
        }
      )
      .then((data) => {
        setUserDetailsSettings((prev) => ({
          ...prev,
          DisplayName: displayName,
        }));
        setEditName(null);
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
      setAlertSettings(settings.AlertSettings);
      setUserDetailsSettings((prev) => ({
        ...prev,
        DisplayName: settings.DisplayName,
      }));
    }
  }, [settings]);

  useEffect(async () => {
    const childrens = await axios.get(
      `${config.PIGGY_DB_URL}/parentChild/62171cef74e8cac9530dcdsdacbw`
    );
    setChildrens(childrens.data);
  }, []);

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h6">הילדים שלי</Typography>
        <div className={classes.childrenContainer}>
          <ChildrenDisplay onClick={() => {}} name="+" />
          {childrens.map((children) => (
            <ChildrenDisplay
              key={children._id}
              onClick={() =>
                navigate(routes.ChildrenQuickView, {
                  state: { displayName: children.UserSettings?.DisplayName },
                })
              }
              name={children.UserSettings?.DisplayName}
            />
          ))}
        </div>
      </div>
      <SettingBox title="פרטים אישיים">
        <>
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
            <Link href="#" underline="none">
              {"עדכון פרטי תשלום"}
            </Link>
            <Button className={classes.btn} variant="contained">
              הוספת הורה לחשבון
            </Button>
          </div>
        </>
      </SettingBox>
      <SettingBox title="התראות" className={classes.alertContainer}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={alertSettings.newAim}
                onChange={() => handleChangeSettings("newAim")}
              />
            }
            label="נוסף יעד חדש"
          />
          <FormControlLabel
            control={
              <Switch
                checked={alertSettings.newExpense}
                onChange={() => handleChangeSettings("newExpense")}
              />
            }
            label="נוספה הוצאה חדשה"
          />
          <FormControlLabel
            control={
              <Switch
                checked={alertSettings.ReceivedMonyLimit}
                onChange={() => handleChangeSettings("ReceivedMonyLimit")}
              />
            }
            label="הכסף בארנק עומד להיגמר"
          />
        </FormGroup>
      </SettingBox>
    </div>
  );
};

export default ParentSettings;
