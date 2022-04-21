import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import axios from 'axios';
import config from '../../conf.json';
import { Grid, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
	container: {
		width: '60%',
		margin: 'auto',
		marginTop: '20vh',
	},
	item: {
		marginTop: '20px',
	},
	textFont: {
		fontSize: '25px',
	},
	btnFont: {
		fontSize: '30px',
	},
}));

const UserTypeSelect = ({setBackGroungColor}) => {
	const navigate = useNavigate();
	const classes = useStyles();
	const goToParentLogin = () => navigate('/login/parent');
	const goToChildLogin = () => navigate('/login/child');
	const [isChildren, setIsChildren] = useState(true);
	const [isLanding, setIsLanding] = useState(true);

	useEffect(async () => {
		const user = JSON.parse(sessionStorage.getItem('profileObj'));
		if (user) {
			const userMail = user['email'];
			const userObject = await axios.get(`${config.PIGGY_DB_URL}/identity/${userMail}`);
			setIsLanding(false);

			if (userObject['data']['type'] === 'parent') setIsChildren(false);
			if (userObject['data']['type'] === 'child') setIsChildren(true);
		} else {
			setIsLanding(true);
			setIsChildren(true);
			setBackGroungColor('#ede8e8');
		}
	}, []);

	return (
		<React.Fragment>
			<CssBaseline />
			<Grid container className={classes.container}>
				<Grid item xs={12} className={classes.item}>
					<Typography className={classes.textFont}>אני...</Typography>
				</Grid>
				<Grid item xs={12} className={classes.item}>
					<Button variant='contained' fullWidth className={classes.btnFont} onClick={goToParentLogin}>
						הורה
					</Button>
				</Grid>
				<Grid item xs={12} className={classes.item}>
					<Button variant='contained' fullWidth className={classes.btnFont} onClick={goToChildLogin}>
						נער
					</Button>
				</Grid>
				<Grid item xs={12} className={classes.item}>
					<Typography variant='caption'>* ניתן להשתמש באפליקציה מגיל 14</Typography>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default UserTypeSelect;
