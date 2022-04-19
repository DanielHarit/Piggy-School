import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import ParentContext from '../../ParentContext';
import { Button, Grid } from '@mui/material';
import LabelOffOutlinedIcon from '@mui/icons-material/LabelOffOutlined';

const useStyles = makeStyles((theme) => ({
	eraseIcon: {
		transform: 'scale(-1,1)',
	},
	btn: {
		fontSize: '20px !important',
		height: '100%',
	},
	btnItem: {
		padding: '5px',
	},
	input: {
		width: '90%',
	},
	inputWrapper: {
		display: 'flex',
		justifyContent: 'center',
	},
	keyboard: {
		padding: '10px 0',
	},
}));

const NumbersKeyboard = () => {
	const { amount, setAmount } = useContext(ParentContext);

	const classes = useStyles();

	return (
		<Grid container>
			<Grid item xs={12} className={classes.inputWrapper}>
				<TextField
					className={classes.input}
					variant='standard'
					placeholder='כמה?'
					disabled={true}
					value={+amount || ''}
					inputProps={{ style: { '-webkit-text-fill-color': 'black', fontSize: '20px', textAlign: 'center' } }}
				/>
			</Grid>
			<Grid item container className={classes.keyboard}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
					<Grid item key={num} xs={4} className={classes.btnItem}>
						<Button
							variant='outlined'
							className={classes.btn}
							onClick={() => setAmount((prevAmount) => prevAmount * 10 + num)}>
							{num}
						</Button>
					</Grid>
				))}
				<Grid item xs={4} className={classes.btnItem}>
					<Button className={classes.btn} onClick={() => setAmount((prevAmount) => Math.floor(prevAmount / 10))}>
						<LabelOffOutlinedIcon className={classes.eraseIcon} />
					</Button>
				</Grid>
				<Grid item xs={4} className={classes.btnItem}>
					<Button variant='outlined' className={classes.btn} onClick={() => setAmount((prevAmount) => prevAmount * 10)}>
						{0}
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default NumbersKeyboard;
