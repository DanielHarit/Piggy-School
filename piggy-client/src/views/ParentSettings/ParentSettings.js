import { Switch, Typography, Input, FormControl } from "@mui/material";
import React, { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import SettingBox from "../../components/Commons/SettingBox";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import Swal from "sweetalert2";
import { Paper } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Skeleton from "@mui/material/Skeleton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import routes from "../../components/Router/Routes";
import { Navigate, useLocation } from "react-router-dom";
import ChildrenDisplay from "../ParentTransferMoneyPage/ChildrenDisplay";
import Button from "@mui/material/Button";
import config from "../../conf.json";
import ChildrenDisplayAll from "../../components/ChildrenBoardData/ChildrenDisplayAll";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
  },
  childrenContainer: {
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
    "& > .MuiSkeleton-root": {
      margin: "0 8px",
    },
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
  title: {
    width: '85%',
    marginRight: 'auto',
		marginLeft: 'auto',
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
  const [selectedChildrenId, setSelectedChildrenId] = useState();
  const [editName, setEditName] = useState(null);
  const [childrens, setChildrens] = useState([]);
  const [userId, setUserId] = useState("");
  const [isChildrenLoading, setIsChildrensLoding] = useState(true);
  const [isCreditCardUpdateOpen, setIsCreditCardUpdateOpen] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState();
  // const [addedChildrenMail, setAddedChildrenMail] = useState("");
  // const [isAddNewChildrenOpen, setIsAddNewChildrenOpen] = useState(false);

  useState(async () => {
    const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const user = await axios.get(
      `${config.PIGGY_DB_URL}/parent/mail/${userMail}`
    );
    setUserId(user.data._id);
  }, []);

  const navigate = useNavigate();

  const handleCardNumberChange = (event) => {
    setCreditCardNumber(event.target.value);
  };

  // const handleChildrenMailChange = (event) => {
  //   setAddedChildrenMail(event.target.value);
  // };

  const handleChangeSettings = (prop) => {
    axios
      .put(`${config.PIGGY_DB_URL}/parent/AlertSettings/${userId}`, {
        [prop]: !alertSettings[prop],
      })
      .then((data) =>
        setAlertSettings((prev) => ({ ...prev, [prop]: !prev[prop] }))
      );
  };

  const handleChangeDisplayName = (displayName) => {
    axios
      .put(`${config.PIGGY_DB_URL}/parent/DisplayName/${userId}`, {
        value: displayName,
      })
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

  const updateCreditCard = () => {
    axios
      .put(`${config.PIGGY_DB_URL}/parent/creditCardNumber/${userId}`, {
        value: creditCardNumber,
      })
      .then(() => {
        setIsCreditCardUpdateOpen(false);
        setCreditCardNumber("");
        Swal.fire({
          title: "פרטי האשראי עודכנו בהצלחה",
          icon: "success",
          width: "80%",
          confirmButtonColor: "#781f63",
          confirmButtonText: "המשך",
        });
      })
      .catch((err) => {
        setIsCreditCardUpdateOpen(false);
        Swal.fire({
          title: "אופס!",
          text: "משהו התפקשש... כדאי לנסות שוב!",
          icon: "error",
          width: "80%",
          confirmButtonColor: "#781f63",
          confirmButtonText: "הבנתי",
        }).then(() => setIsCreditCardUpdateOpen(true));
      });
  };

  useEffect(async () => {
    if (userId) {
      const childrens = await axios.get(
        `${config.PIGGY_DB_URL}/parentChild/${userId}`
      );
      setIsChildrensLoding(false);
      setChildrens(childrens.data);
    }
  }, [userId]);

  return (
    <div className={classes.container}>
      <div>

      <div className={classes.title}>
      <Typography>הילדים שלי</Typography>
      </div>
      
      <ChildrenDisplayAll 
          parentId={userId} 
          selectedChildrenId={setSelectedChildrenId}
          isSettings="true"
          isNavigate="true"
          childrens = {childrens}
          isChildrenLoading = {isChildrenLoading}
          setChildrens = {setChildrens}
          >
        </ChildrenDisplayAll>

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
            <Button
              className={classes.btn}
              variant="contained"
              onClick={() => setIsCreditCardUpdateOpen(true)}
            >
              עדכון פרטי תשלום
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
      <Container fixed>
        <Dialog
          open={isCreditCardUpdateOpen}
          onClose={() => setIsCreditCardUpdateOpen(false)}
        >
          <DialogTitle>הכנס מספר כרטיס חדש</DialogTitle>
          <DialogContent>
            <TextField
              id="parent-card-number"
              autoFocus
              fullWidth
              value={creditCardNumber}
              onChange={handleCardNumberChange}
              style={{ marginBottom: "15px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsCreditCardUpdateOpen(false)}>
              ביטול
            </Button>
            <Button onClick={updateCreditCard}>אישור</Button>
          </DialogActions>
        </Dialog>
      </Container>
    
    </div>
  );
};

export default ParentSettings;
