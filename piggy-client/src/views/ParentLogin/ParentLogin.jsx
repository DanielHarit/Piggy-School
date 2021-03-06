import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PiggyCoin from '../../assets/img/login.png';
import CircularProgress from '@mui/material/CircularProgress';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Login from '../../components/Auth/Login';
import axios from 'axios';
import makeStyles from '@mui/styles/makeStyles';
import config from '../../conf.json';

const className = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: '#ede8e8',
	p: 4,
	width: '80%',
};

// const useclassNames = makeclassNames((theme) => ({
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

const useclassNames = makeStyles((theme) => ({
	container: {
		width: '70%',
		margin: 'auto',
		marginTop: '0.5vh',
	},
	backwordIcon: {
		display: 'flex',
		justifyContent: 'end',
		marginTop: '2vh',
		marginLeft: '1vw',
	},
	item: {
		marginTop: '20px',
	},
	MDtextFont: {
		fontSize: '18px',
	},
	textFont: {
		fontSize: '25px',
	},
	btnFont: {
		fontSize: '25px',
		borderRadius: '50px',
		padding: '10px 0px',
	},
	image: {
		width: 'inherit',
		height: 'inherit',
	},
	divider: {
		marginTop: '40px',
	},
	imgContainer: {
		width: '74vw',
		height: '25vh',
		margin: 'auto',
	},
	loadingContainer: {
		width: 'inherit',
		height: '100vh',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		'& span': {
			width: '90px !important',
			height: '90px !important',
		},
	},
}));

const ParentLogin = () => {
	const classes = useclassNames();
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
	const [isLoading, setIsLoading] = useState(false);

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
			{isLoading ? (
				<div className={classes.loadingContainer}>
					<CircularProgress color='primary' />
				</div>
			) : (
				<>
					<div className={classes.backwordIcon}>
						<IconButton aria-label='Example' onClick={() => navigate('/login')}>
							<ArrowBackIosNewIcon fontSize='large' />
						</IconButton>
					</div>
					<Grid container className={classes.container}>
						<Grid item xs={12} className={classes.item}>
							<div className={classes.imgContainer}>
								<img className={classes.image} src={PiggyCoin} alt='PiggyCoin' />
							</div>
						</Grid>
						<Grid item xs={12} className={classes.item}>
							<Typography className={classes.MDtextFont}>?????? ???? ?????? ???????????</Typography>
						</Grid>
						<Grid item xs={12} onClick={() => setIsLoading(true)}>
							<Login setIsLoding={setIsLoading} fullWidth btnText='?????????? ???? ????????' />
						</Grid>

						<Grid item xs={12} className={classes.divider}>
							<Typography className={classes.textFont}>?????????? ???????????</Typography>
							<Typography className={classes.MDtextFont}>???????? ?????????????? ????????????</Typography>
						</Grid>
						<Grid item xs={12} className={classes.item}>
							<Button variant='contained' fullWidth className={classes.btnFont} onClick={handleOpen}>
								?????????? ???? ????????
							</Button>
						</Grid>
						{/* <Grid item xs={12} className={classes.item}>
					<Button color='inherit' onClick={loginAsParent}>
						?????? ????????!
					</Button>
				</Grid> */}
					</Grid>

					<Container fixed>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby='modal-modal-title'
							aria-describedby='modal-modal-description'>
							<Paper sx={className}>
								<TextField
									id='parent-card-number'
									label='?????? ???????? ???????? ??????????'
									fullWidth
									value={creditCardNumber}
									onChange={handleCardNumberChange}
									className={{ marginBottom: '15px' }}
								/>
								<TextField
									id='parent-card-experation'
									label='?????? ???????? ???????? ??????????'
									fullWidth
									value={creditCardExperation}
									onChange={handleCardExperationChange}
									className={{ marginBottom: '15px' }}
								/>
								<TextField
									id='parent-card-cvv'
									label='?????? ???????? CVV'
									fullWidth
									value={creditCardCVV}
									onChange={handleCardCVVChange}
									className={{ marginBottom: '15px' }}
								/>
								<Login btnText='?????????? ???? ????????' successCallback={registerParent} />
							</Paper>
						</Modal>
					</Container>
				</>
			)}
		</>
	);
};

export default ParentLogin;
