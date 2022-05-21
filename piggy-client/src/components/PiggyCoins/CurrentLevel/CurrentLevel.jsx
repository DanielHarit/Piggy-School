import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Card, Box } from '@mui/material';
import Beginner from '../../../assets/img/beginner.png';
import Advenced from '../../../assets/img/advenced.png';
import Best from '../../../assets/img/best.png';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	ellipse: {
		backgroundColor: 'gray',
	},
	coinImg: {
		display: 'flex',
		height: 35,
	},
	sum: {
		color: 'gold',
		fontWeight: 'bold',
		fontSize: '22px',
		width: '100%',
		textAlign: 'center',
		paddingLeft: '10px',
		paddingRight: '10px',
	},
}));

const CurrentLevel = ({ total }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Card className={classes.ellipse} sx={{ borderRadius: 5, minWidth: 90, height: 38 }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
					<img
						className={classes.coinImg}
						src={total > 500 ? Best : total > 250 ? Advenced : Beginner}
						alt='PiggyCoin'
					/>
					<Typography className={classes.sum}>{`חזירון   ${
						total > 500 ? 'תותח' : total > 250 ? 'מתקדם' : total > 0 ? 'מתחיל' : ''
					}`}</Typography>
				</Box>
			</Card>
		</div>
	);
};

CurrentLevel.propTypes = {
	total: PropTypes.number,
};
CurrentLevel.defaultProps = {
	total: 0,
};

export default CurrentLevel;
