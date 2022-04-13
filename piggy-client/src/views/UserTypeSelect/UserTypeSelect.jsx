import React, { useEffect, useState } from 'react'
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
  const [isChildren, setIsChildren] = useState(true);
	const [isLanding, setIsLanding] = useState(true);

  useEffect(async () => {
    const user = JSON.parse(sessionStorage.getItem("profileObj"));
    if (user) {
      const userMail = user["email"];
      const userObject = await axios.get(`${config.PIGGY_DB_URL}/identity/${userMail}`); 
      setIsLanding(false);

      if (userObject["data"]["type"] === 'parent') setIsChildren(false);
      if (userObject["data"]["type"] === 'child') setIsChildren(true);
    } else {
			setIsLanding(true);
			setIsChildren(true);
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
