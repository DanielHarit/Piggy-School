import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import axios from 'axios';
import config from '../../conf.json';

const UserTypeSelect = () => {
  const navigate = useNavigate();
	const goToParentLogin = () => navigate('/login/parent');
	const goToChildLogin = () => navigate('/login/child');

  useEffect(async () => {
    const user = JSON.parse(sessionStorage.getItem("profileObj"));
    if (user) {
      const userMail = user["email"];
      const userObject = await axios.get(`${config.PIGGY_DB_URL}/identity/${userMail}`); 
      
      if (userObject["data"]["type"] === 'parent') navigate("/parent");
      if (userObject["data"]["type"] === 'child') navigate("/child");
    }
}, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        אני...
          <Button onClick={goToParentLogin}>
            הורה
			    </Button>
          <Button onClick={goToChildLogin}>
            נער
			    </Button>
      </Container>
    </React.Fragment>

  );
}

export default UserTypeSelect;
