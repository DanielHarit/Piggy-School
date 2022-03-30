import React from 'react';
import config from '../../../conf.json'
import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../../utils/refreshToken';

const clientId = config.CLIENT_ID;

function Login() {
  const onSuccess = (res) => {
    sessionStorage.setItem("profileObj", JSON.stringify(res.profileObj));
    sessionStorage.setItem("tokenId", JSON.stringify(res.tokenId));
    refreshTokenSetup(res);
    navigate("/parent");
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