import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CircularProgress from '@mui/material/CircularProgress';

import Login from "../../components/Auth/Login";
import PiggyCoin from "../../assets/img/login.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Grid, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import config from "../../conf.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ede8e8",
  p: 4,
  width: "80%",
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "70%",
    margin: "auto",
    marginTop: "0.5vh",
  },
  backwordIcon: {
    display: "flex",
    justifyContent: "end",
	marginTop: "2vh",
	marginLeft: '1vw'
  },
  item: {
    marginTop: "20px",
  },
  MDtextFont: {
    fontSize: "18px",
  },
  textFont: {
    fontSize: "25px",
  },
  btnFont: {
    fontSize: "25px",
    borderRadius: "50px",
    padding: "10px 0px",
  },
  image: {
    width: "inherit",
    height: "inherit",
  },
  divider: {
    marginTop: "40px",
  },
  imgContainer: {
    width: '74vw',
	height: '25vh',
    margin: "auto",
  },
  loadingContainer: {
	width: 'inherit',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
	'& span': {
		width: '90px !important',
		height: '90px !important'
	}
  }
}));

const ChildLogin = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isLoading,setIsLoading] = useState(false);
  const registerChild = async (userMail, userName) => {
    const newChild = {
      mail: String(userMail),
      displayName: String(userName),
      parentMail: String(parentMail),
    };

    console.log(newChild);

    await axios
      .post(`${config.PIGGY_DB_URL}/children/register`, newChild)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setParentMail("");
  };

  const [parentMail, setParentMail] = React.useState("");
  const handleMailChange = (event) => {
    setParentMail(event.target.value);
  };

  const loginAsChild = () => {
    sessionStorage.setItem(
      "profileObj",
      JSON.stringify({
        email: "mika@gmail.com",
      })
    );

    navigate("/child");
  };

  return (
    <>
	{isLoading ? 
	<div className={classes.loadingContainer}>
		<CircularProgress color="primary" />
	</div>:
	 <><div className={classes.backwordIcon}>
				  <IconButton aria-label="Example" onClick={() => navigate("/login")}>
					  <ArrowBackIosNewIcon fontSize="large" />
				  </IconButton>
			  </div><Grid container className={classes.container}>
					  <Grid item xs={12} className={classes.item}>
						  <div className={classes.imgContainer}>
							  <img className={classes.image} src={PiggyCoin} alt="PiggyCoin" />
						  </div>
					  </Grid>
					  <Grid item xs={12} className={classes.item}>
						  <Typography className={classes.textFont}>שווה לראות אותך!</Typography>
					  </Grid>
					  <Grid item xs={12} className={classes.divider}>
						  <Typography className={classes.MDtextFont}>
							  ההורים כבר הזמינו אותך?
						  </Typography>
					  </Grid>
					  <Grid item xs={12}  onClick={() =>setIsLoading(true)}>
						  <Login setIsLoding={setIsLoading} fullWidth btnText="כניסה עם גוגל" />
					  </Grid>

					  <Grid item xs={12} className={classes.divider}>
						  <Typography className={classes.textFont}>חדשים בפיגי?</Typography>
						  <Typography className={classes.MDtextFont}>
							  כדי להירשם לאפליקציה על אחד ההורים שלך להירשם ולשלוח לך הזמנה לחשבון
							  המשותף
						  </Typography>
					  </Grid>
					  <Grid item xs={12} className={classes.item}>
						  <Button
							  variant="contained"
							  fullWidth
							  className={classes.btnFont}
							  onClick={handleOpen}
						  >
							  שליחת הזמנה להורה
						  </Button>
					  </Grid>
					  <Grid item xs={12} className={classes.item}>
						  <Typography variant="caption">
							  * ניתן להשתמש באפליקציה מגיל 14
						  </Typography>
					  </Grid>
					  <Grid item xs={12} className={classes.item}>
						  <Button color="inherit" onClick={loginAsChild}>
							  אני נער!
						  </Button>
					  </Grid>
				  </Grid><Container fixed>
					  <Modal
						  open={open}
						  onClose={handleClose}
						  aria-labelledby="modal-modal-title"
						  aria-describedby="modal-modal-description"
					  >
						  <Paper sx={style}>
							  <TextField
								  id="parent-mail"
								  label="לאיזה מייל נשלח את ההזמנה?"
								  fullWidth
								  value={parentMail}
								  onChange={handleMailChange}
								  style={{ marginBottom: "15px" }} />
							  <Login btnText="הרשם" successCallback={registerChild} />
						  </Paper>
					  </Modal>
				  </Container></>
}
    </>
  );
};

export default ChildLogin;
