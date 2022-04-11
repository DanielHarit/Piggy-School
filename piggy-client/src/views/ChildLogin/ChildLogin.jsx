import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Login from '../../components/Auth/Login';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

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

const ChildLogin = () => {
  const navigate = useNavigate();
  const sendParentInvite = () => {
    alert(parentMail);
  };
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setParentMail('');
  };

  const [parentMail, setParentMail] = React.useState('');
  const handleMailChange = (event) => {
    setParentMail(event.target.value);
  };

  const loginAsChild = () => {
    sessionStorage.setItem("profileObj", JSON.stringify({ 
      "email": "mika@gmail.com"
    }));
    
    navigate("/child");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        שווה לראות אותך!
        ההורים כבר הזמינו אותך?
        <Login />
        חדשים בפיגי?
        כדי להירשם לאפליקציה על אחד ההורים שלך להירשם ולשלוח לך הזמנה לחשבון המשותף
        <Button onClick={handleOpen}>
          שליחת הזמנה להורה
			  </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              לאיזה מייל נשלח את ההזמנה?
            </Typography>
            <TextField
              id="parent-mail"
              placeholder="Parent Mail"
              fullWidth
              value={parentMail}
              onChange={handleMailChange}
            />
            <Button color='inherit' onClick={sendParentInvite}>
              שליחה להורה
            </Button>
          </Box>
        </Modal>
        *ניתן להשתמש באפליקציה מגיל 14
        <Button color='inherit' onClick={loginAsChild}>
					I'm a child
				</Button>
      </Container>
    </React.Fragment>
  );
}

export default ChildLogin;
