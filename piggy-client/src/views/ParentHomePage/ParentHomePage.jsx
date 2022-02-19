import React, { useState, useEffect } from 'react';
import HomePage from '../../components/HomePage';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
	text: {
		display: 'flex',
		justifyContent: 'flex-end',
		paddingTop: theme.spacing(2),
	},
}));

const ParentHomePage = () => {
	const classes = useStyles();
	const [amount, setAmount] = useState();
	const [showText, setShowText] = useState('הקלד למעלה כמה תרצה להעביר');

	useEffect(() => {
		amount && amount > 0 ? setShowText(`בחרת להעביר ${amount} שקלים`) : setShowText('הקלד למעלה כמה תרצה להעביר');
	}, [amount]);

	return (
		<HomePage title='היי הורה' btnText='לתצוגת ילד' btnLink='/child'>
			<TextField label='כמה תרצה להעביר?' variant='outlined' color='primary' fullWidth value={amount} type='number' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(event) => setAmount(event.target.value)} />
			<Typography variant='h6' component='div' className={classes.text}>
				{showText}
			</Typography>
		</HomePage>
	);
};

export default ParentHomePage;
