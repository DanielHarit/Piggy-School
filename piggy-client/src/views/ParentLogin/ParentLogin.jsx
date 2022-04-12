import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Login from '../../components/Auth/Login';
import axios from 'axios';
import config from '../../conf.json';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const ParentLogin = () => {
  const navigate = useNavigate();
	const registerParent = async (userMail, userName) => {
    const newCParent = {
      mail: String(userMail),
      displayName: String(userName),
      creditCardNumber: String(creditCardNumber),
      childrensList: []
    };

    console.log(newCParent);

    await axios.post(`${config.PIGGY_DB_URL}/parent/register`, newCParent)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCreditCardNumber('');
  };

  const [creditCardNumber, setCreditCardNumber] = React.useState('');
  const handleCardNumberChange = (event) => {
    setCreditCardNumber(event.target.value);
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
        <Login btnText="כניסה עם גוגל" />
        חדשים בפיגי? בואו והצטרפו למשפחה
        <Button onClick={handleOpen}>
          הרשמה עם גוגל
			  </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              אנא הכנס מספר אשראי
            </Typography>
            <TextField
              id="parent-card-number"
              placeholder="Card Number"
              fullWidth
              value={creditCardNumber}
              onChange={handleCardNumberChange}
            />
            <Login btnText="הרשמה עם גוגל" successCallback={registerParent} />
          </Box>
        </Modal>

        <Button color='inherit' onClick={loginAsParent}>
					אני הורה!
				</Button>
      </Container>
    </React.Fragment>

  );
}

export default ParentLogin;
