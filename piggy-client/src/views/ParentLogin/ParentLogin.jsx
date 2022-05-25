import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { makeStyles, Paper } from '@mui/material';
import { Grid } from '@mui/material';
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
	bgcolor: '#ede8e8',
	p: 4,
	width: '80%',
};

// const useStyles = makeStyles((theme) => ({
// 	container: {
// 		width: '60%',
// 		margin: 'auto',
// 		marginTop: '20vh',
// 	},
// 	item: {
// 		marginTop: '20px',
// 	},
// 	bigFont: {
// 		fontSize: '30px',
// 	},
// }));

const containerStyle = {
	width: '70%',
	margin: 'auto',
	marginTop: '20vh',
};

const itemStyle = {
	marginTop: '20px',
};

const textFontStyle = {
	fontSize: '25px',
};

const btnFontStyle = {
	fontSize: '30px',
};

const ParentLogin = () => {
	const navigate = useNavigate();
	const registerParent = async (userMail, userName) => {
		const newCParent = {
			mail: String(userMail),
			displayName: String(userName),
			creditCardNumber: String(creditCardNumber),
			creditCardExperation: String(creditCardExperation),
			creditCardCVV: String(creditCardCVV),
			childrensList: [],
		};

		console.log(newCParent);

		await axios
			.post(`${config.PIGGY_DB_URL}/parent/register`, newCParent)
			.then((response) => console.log(response))
			.catch((error) => console.log(error));
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setCreditCardNumber('');
		setCreditCardExperation('');
		setCreditCardCVV('');
	};

	const [creditCardNumber, setCreditCardNumber] = React.useState('');
	const [creditCardExperation, setCreditCardExperation] = React.useState('');
	const [creditCardCVV, setCreditCardCVV] = React.useState('');

	const handleCardNumberChange = (event) => {
		setCreditCardNumber(event.target.value);
	};
	const handleCardExperationChange = (event) => {
		setCreditCardExperation(event.target.value);
	};
	const handleCardCVVChange = (event) => {
		setCreditCardCVV(event.target.value);
	};

	const loginAsParent = () => {
		sessionStorage.setItem(
			'profileObj',
			JSON.stringify({
				email: 'shlomi@gmail.com',
			})
		);

		navigate('/parent');
	};

	return (
		<>
			<Grid container style={containerStyle}>
				<Grid item xs={12} style={itemStyle}>
					<Typography style={textFontStyle}>כבר יש לכם חשבון?</Typography>
				</Grid>
				<Grid item xs={12} style={itemStyle}>
					<Login fullWidth btnText='כניסה עם גוגל' />
				</Grid>

				<Grid item xs={12} style={itemStyle}>
					<Typography style={textFontStyle}>חדשים בפיגי?</Typography>
					<Typography style={textFontStyle}>בואו והצטרפו למשפחה</Typography>
				</Grid>
				<Grid item xs={12} style={itemStyle}>
					<Button variant='contained' fullWidth style={btnFontStyle} onClick={handleOpen}>
						הרשמה עם גוגל
					</Button>
				</Grid>
				<Grid item xs={12} cstyle={itemStyle}>
					<Button color='inherit' onClick={loginAsParent}>
						אני הורה!
					</Button>
				</Grid>
			</Grid>

			<Container fixed>
				<Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
					<Paper sx={style}>
						<TextField id='parent-card-number' label='אנא הכנס מספר אשראי' fullWidth value={creditCardNumber} onChange={handleCardNumberChange} style={{ marginBottom: '15px' }} />
						<TextField id='parent-card-experation' label='אנא הכנס תוקף אשראי' fullWidth value={creditCardExperation} onChange={handleCardExperationChange} style={{ marginBottom: '15px' }} />
						<TextField id='parent-card-cvv' label='אנא הכנס CVV' fullWidth value={creditCardCVV} onChange={handleCardCVVChange} style={{ marginBottom: '15px' }} />
						<Login btnText='הרשמה עם גוגל' successCallback={registerParent} />
					</Paper>
				</Modal>
			</Container>
		</>
	);
};

export default ParentLogin;
