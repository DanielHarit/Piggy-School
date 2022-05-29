import React from 'react';
import { GoogleLogout } from 'react-google-login';
import config from '../../../conf.json'
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
const clientId = config.CLIENT_ID;

const useStyles = makeStyles((theme) => ({
  container: { 
    display: "flex",
    flexDirection: 'column',
    // backgroundColor: 'white',
    flexGrow: '1',
    margin: '1px 15px',
    borderRadius: '10px',
    padding: '12px 10px',
    justifyContent: 'center'
},
buttonStyle:{
  width: "60%",
  alignSelf: "center",
}
}));

function Logout() {
  const navigate = useNavigate();
  const classes = useStyles();

  const onSuccess = () => {
    console.log('Logout made successfully');
    sessionStorage.removeItem("profileObj");
    sessionStorage.removeItem("tokenId");
    navigate("/login");
  };

  return (
    <div className={classes.container}>
        <GoogleLogout
          clientId={clientId}
          // buttonText="התנתקות"
          onLogoutSuccess={onSuccess}
          render={renderProps => (
            <Button onClick={renderProps.onClick} className={classes.buttonStyle} variant='contained'> התנתקות</Button>
          )}
        ></GoogleLogout>
    </div>
  );
}

export default Logout;