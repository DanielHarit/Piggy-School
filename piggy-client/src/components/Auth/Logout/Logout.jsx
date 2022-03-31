import React from 'react';
import { GoogleLogout } from 'react-google-login';
import config from '../../../conf.json'
import { useNavigate } from 'react-router-dom';

const clientId = config.CLIENT_ID;

function Logout() {
  const navigate = useNavigate();

  const onSuccess = () => {
    console.log('Logout made successfully');
    navigate("/login");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;