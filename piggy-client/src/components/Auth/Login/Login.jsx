import React from 'react';
import config from '../../../conf.json'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../../utils/refreshToken';
import { ClassNames } from '@emotion/react';
import makeStyles from '@mui/styles/makeStyles';



const clientId = config.CLIENT_ID;
const useStyles = makeStyles((theme) => ({
  googleBtn: {
    height: '8vh',
    display: 'flex !important',
    justifyContent: 'center',
    width: '100%',
    borderRadius: '50px !important',
    '& :nth-child(1)' : {
      marginRight: '0px !important',
      padding: '0px !important'
      },
    '& :nth-child(2)' : {
      fontSize: '25px',
      display: 'flex'
      },
  },
  container: {
 //   width: '90vw'
  }
  
    
}));

function Login({successCallback= async() => {}, btnText='ערך דיפולטי', setIsLoding =() =>{}}) {
  const classes = useStyles();

  const onSuccess = async (res) => {
    setIsLoding(true);
    await successCallback(res.profileObj.email, res.profileObj.name);
    sessionStorage.setItem("profileObj", JSON.stringify(res.profileObj));
    sessionStorage.setItem("tokenId", JSON.stringify(res.tokenId));
    refreshTokenSetup(res);


    const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const user = await axios.get(`${config.PIGGY_DB_URL}/identity/${userMail}`); 


    if (user["data"]["type"] === 'parent') navigate("/parent");
    else if (user["data"]["type"] === 'child') navigate("/child");
    else setIsLoding(false);
    //navigate("/child");
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <GoogleLogin
        clientId={clientId}
        buttonText={btnText}
        onSuccess={onSuccess}
        onFailure={onFailure}
        className={classes.googleBtn}
        cookiePolicy={'single_host_origin'}
        // isSignedIn={true}
      />
    </div>
  );
}

export default Login;