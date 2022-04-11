import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const UserTypeSelect = () => {
  const navigate = useNavigate();
	const goToParentLogin = () => navigate('/login/parent');
	const goToChildLogin = () => navigate('/login/child');

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
