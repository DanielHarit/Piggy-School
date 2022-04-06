import React from 'react';
import config from '../../../conf.json'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../../utils/refreshToken';

const clientId = config.CLIENT_ID;

function Login() {
  const onSuccess = async (res) => {
    sessionStorage.setItem("profileObj", JSON.stringify(res.profileObj));
    sessionStorage.setItem("tokenId", JSON.stringify(res.tokenId));
    refreshTokenSetup(res);

    const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const user = await axios.get(`${config.PIGGY_DB_URL}/identity/${userMail}`); 

    if (user["data"]["type"] === 'parent') navigate("/parent");
    if (user["data"]["type"] === 'child') navigate("/child");
    else console.log("None registered user");
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  const navigate = useNavigate();

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;