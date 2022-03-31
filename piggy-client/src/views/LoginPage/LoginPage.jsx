import * as React from 'react';
import Login from '../../components/Auth/Login';
import Logout from '../../components/Auth/Logout';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();
  
  const loginAsChild = () => {
    sessionStorage.setItem("profileObj", JSON.stringify({ 
      "email": "mika@gmail.com"
    }));
    
    navigate("/child");
  }
  
  const loginAsParent = () => {
    sessionStorage.setItem("profileObj", JSON.stringify({ 
      "email": "shlomi@gmail.com"
    }));

    navigate("/parent");
  }

  return (
      <div>
          <Login />
          <Logout />
          <Button color='inherit' onClick={loginAsChild}>
						I'm a child
					</Button>
          <Button color='inherit' onClick={loginAsParent}>
						I'm a parent
					</Button>
      </div>
  )
}

export default LoginPage;
