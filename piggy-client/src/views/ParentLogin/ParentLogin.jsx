import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Login from '../../components/Auth/Login';

const ParentLogin = () => {
  const navigate = useNavigate();
	const registerParent = () => {
    alert('insert credit card');
  };

  const loginAsParent = () => {
    sessionStorage.setItem("profileObj", JSON.stringify({ 
      "email": "shlomi@gmail.com"
    }));

    navigate("/parent");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        כבר יש לכם חשבון?
        <Login />
        חדשים בפיגי? בואו והצטרפו למשפחה
        <Button onClick={registerParent}>
          הרשמה עם גוגל
			  </Button>

        <Button color='inherit' onClick={loginAsParent}>
					I'm a parent
				</Button>
      </Container>
    </React.Fragment>

  );
}

export default ParentLogin;
